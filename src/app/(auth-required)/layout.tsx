import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/sign-in");
  if ((session.user as any)?.onboarded) redirect("/dashboard");
  return <>{children}</>;
}