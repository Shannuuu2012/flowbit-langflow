import { NextRequest, NextResponse } from 'next/server'



export async function POST(req: Request) {
  const { agent, input } = await req.json();

  const flowIdMap: Record<string, string> = {
    classifier: "1ff10120-2798-4673-9aee-b77f2a99157c",
    email: "a7ad34df-0cef-4a66-9d7e-0d91cc5e1f9c",
    json: "56222060-3a79-425e-bedf-d09a18437c24",
    pdf: "7359775a-121b-4bfb-8219-b04be06e9597",
  };

  const flow_id = flowIdMap[agent];
  if (!flow_id) {
    return new Response(JSON.stringify({ error: "Invalid agent" }), { status: 400 });
  }

  const res = await fetch(`http://localhost:7860/api/v1/run/${flow_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: { input } }),
  });

  // 👇 This part is added to help debug the actual output from LangFlow
  const rawText = await res.text();
  console.log("Raw response from LangFlow:", rawText); // 👈 Add this

  try {
    const result = JSON.parse(rawText);

// Try to extract output text
const output =
  result?.outputs?.[0]?.outputs?.[0]?.results?.text?.text ||
  result?.outputs?.[0]?.outputs?.[0]?.outputs?.text?.message ||
  JSON.stringify(result, null, 2); // fallback if format is different

return Response.json({ output });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to parse response", raw: rawText }),
      { status: 500 }
    );
  }
}
