import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  console.log("Protected layout session:", session?.user?.email);
  if (!session) redirect("/sign-in");
  if (session.user && 'onboarded' in session.user && !session.user.onboarded) redirect("/onboarding");
  return <>{children}</>;
}