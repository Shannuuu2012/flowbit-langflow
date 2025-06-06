import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }) {
  const input = await req.json();
  const res = await fetch("http://localhost:7860/api/v1/runs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workflow_id: params.workflowId, inputs: input }),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
