import { NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs"

export async function POST(req: NextRequest) {
  const { agentId, input } = await req.json()

  const flowPath = path.join(process.cwd(), "flows", `${agentId}.json`)
  if (!fs.existsSync(flowPath)) {
    return NextResponse.json({ error: "Flow not found" }, { status: 404 })
  }

  // MOCK response for now — integrate with real LangFlow API here
  return NextResponse.json({
    output: `Processed "${input}" with agent "${agentId}"`,
  })
}
