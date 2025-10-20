import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthRequiredLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/sign-in");
  if (session.user && 'onboarded' in session.user && !session.user.onboarded) redirect("/dashboard");
  return <>{children}</>;
}