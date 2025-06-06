import { NextRequest, NextResponse } from "next/server";
import { scheduleJob } from "@/lib/cron";
import { workflows } from "@/config";


type TriggerRequest = {
  workflowId: string;
  engine: "langflow"; // Could be extended for other engines
  triggerType: "manual" | "webhook" | "cron";
  inputPayload: any;
};

export async function POST(req: NextRequest) {
  const body: TriggerRequest = await req.json();
  const { workflowId, engine, triggerType, inputPayload } = body;

  if (!workflowId || !engine || !triggerType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Handle LangFlow triggers
  if (engine === "langflow") {
    if (triggerType === "cron") {
      // Schedule cron job
      const job = {
        id: `${workflowId}-${Date.now()}`,
        workflowId,
        schedule: inputPayload.schedule, // e.g., "* * * * *"
        inputPayload,
      };
      scheduleJob(job);
      return NextResponse.json({ status: "Cron job scheduled", job });
    }

    // Manual or webhook: trigger LangFlow run immediately
    const res = await fetch("http://localhost:7860/api/v1/runs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workflow_id: workflowId,
        inputs: inputPayload,
      }),
    });

    const data = await res.json();
    return NextResponse.json({ status: "Triggered", run: data });
  }

  return NextResponse.json({ error: "Unsupported engine" }, { status: 400 });
}
