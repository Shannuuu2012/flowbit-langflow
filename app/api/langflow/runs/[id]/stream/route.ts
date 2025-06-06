export async function GET(req, { params }) {
  const res = await fetch(`http://localhost:7860/api/v1/runs/${params.id}/stream`);
  return new Response(res.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
