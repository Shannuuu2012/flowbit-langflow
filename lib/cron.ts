import cron from "node-cron";
import fs from "fs";
import path from "path";
import { workflows } from "@/config";


const CRON_FILE = path.resolve("cron-jobs.json");

type CronJob = {
  id: string;
  workflowId: string;
  schedule: string; // e.g., "*/5 * * * *"
  inputPayload: any;
};

let jobs: Record<string, cron.ScheduledTask> = {};

// Load and schedule jobs on startup
export function loadCronJobs() {
  if (!fs.existsSync(CRON_FILE)) return;

  const saved: CronJob[] = JSON.parse(fs.readFileSync(CRON_FILE, "utf-8"));
  saved.forEach((job) => {
    scheduleJob(job);
  });
}

// Schedule a new cron job
export function scheduleJob(job: CronJob) {
  // Stop existing job if re-scheduled
  if (jobs[job.id]) {
    jobs[job.id].stop();
  }

  const task = cron.schedule(job.schedule, async () => {
    console.log(`[CRON] Triggering workflow ${job.workflowId} at ${job.schedule}`);
    await fetch("http://localhost:3000/api/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workflowId: job.workflowId,
        engine: "langflow",
        triggerType: "cron",
        inputPayload: job.inputPayload,
      }),
    });
  });

  jobs[job.id] = task;
  saveJob(job);
}

// Save or update job in cron-jobs.json
function saveJob(job: CronJob) {
  let all: CronJob[] = [];
  if (fs.existsSync(CRON_FILE)) {
    all = JSON.parse(fs.readFileSync(CRON_FILE, "utf-8"));
    all = all.filter((j) => j.id !== job.id); // remove duplicate
  }
  all.push(job);
  fs.writeFileSync(CRON_FILE, JSON.stringify(all, null, 2));
}
