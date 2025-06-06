import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const response = await fetch(`http://localhost:7860/api/v1/runs/${params.id}`);
  const data = await response.json();
  return NextResponse.json(data);
}
