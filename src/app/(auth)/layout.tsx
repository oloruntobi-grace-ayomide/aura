"use client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-[100dvh] bg-[#0f2a3f] flex items-center justify-center overflow-hidden">
       
          <Card className="relative md:w-[50%] border-0 shadow-none rounded-[28px] px-[5%] py-[2%]">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Aura</CardTitle>
              <p className="mt-2 text-sm text-slate-500">Welcome back! We are happy to see you again.</p>
            </CardHeader>
            <CardContent className="pt-0">{children}</CardContent>

            <CardFooter>
              <p className="absolute bottom-6 right-6 left-6 text-center max-w-[80%] mx-auto rounded-2xl bg-white/70 px-4 py-3 text-xs text-slate-700 backdrop-blur-md">
                  © 2025 Aura. All rights reserved. You can revoke access at any time from Settings.
              </p>
            </CardFooter>
          </Card>
      </div>
  );  
}
