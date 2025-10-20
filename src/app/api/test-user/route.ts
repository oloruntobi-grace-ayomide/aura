import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  
  if (!email) {
    return Response.json({ error: "Email required" }, { status: 400 });
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, onboarded: true }
    });
    return Response.json({ user });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Something went wrong" }, { status: 500 });
  }
}