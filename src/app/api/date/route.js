export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(new Date().toString());
}
