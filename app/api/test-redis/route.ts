import { rateLimit } from "@/lib/rate-limit";


export async function GET() {

  const result = await rateLimit({
    key: "test:user:123",
    limit: 5,
    window: 60,
  });


  return Response.json(result);
}