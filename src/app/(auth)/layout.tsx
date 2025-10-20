"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";;
import { cn } from "@/lib/utils";
import { MdEmail, MdLock } from "react-icons/md";
import { FaApple, FaUser} from "react-icons/fa";
import { FiEyeOff, FiEye } from "react-icons/fi";

/* ========================= LAYOUT ========================= */
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

/* ========================= SHARED PARTS ========================= */
export function EmailInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <MdEmail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <input
        type="email"
        autoComplete="email"
        {...props}
        className={cn(
          "h-11 w-full rounded-xl border bg-white pl-9 pr-3 text-sm outline-none placeholder:text-slate-400",
          "focus-visible:ring-2 focus-visible:ring-slate-900/10",
          props.className
        )}
      />
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <FaUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <input
        type="text"
        {...props}
        className={cn(
          "h-11 w-full rounded-xl border bg-white pl-9 pr-3 text-sm outline-none placeholder:text-slate-400",
          "focus-visible:ring-2 focus-visible:ring-slate-900/10",
          props.className
        )}
      />
    </div>
  );
}

export function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <MdLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <input
        type={show ? "text" : "password"}
        autoComplete="current-password"
        {...props}
        className={cn(
          "h-11 w-full rounded-xl border bg-white pl-9 pr-10 text-sm outline-none placeholder:text-slate-400",
          "focus-visible:ring-2 focus-visible:ring-slate-900/10",
          props.className
        )}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <FiEyeOff/> : <FiEye/>}
      </button>
    </div>
  );
}

export function DividerOr() {
  return (
    <div className="my-3 flex items-center gap-3 text-xs text-slate-400">
      <div className="h-px flex-1 bg-slate-200" />
      OR
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}


interface SocialButtonsProps {
  // handleAppleAuth: () => void;
  handleGoogleAuth: () => void;
  // isAppleLoading: boolean;
  isGoogleLoading: boolean;
  // appleButtonText: string;
  googleButtonText: string;
}

export function SocialButtons(props: SocialButtonsProps) {
  return (
    <div className="grid gap-2">
      {/* <Button 
        variant="outline" 
        className="h-11 w-full justify-center gap-3 rounded-xl" 
        onClick={props.handleAppleAuth}
        disabled={props.isAppleLoading || props.isGoogleLoading}
      >
        {props.isAppleLoading 
          ? <span className="loader"></span> 
          : <>
              <FaApple className="h-4 w-4"/> 
              {props.appleButtonText}
            </>
        }
      </Button> */}
      
      <Button 
        variant="outline" 
        className="h-11 w-full justify-center gap-3 rounded-xl" 
        onClick={props.handleGoogleAuth}
        disabled={props.isGoogleLoading}
      >
        {props.isGoogleLoading 
          ? <span className="loader"></span> 
          : <>
              <Image src="/images/google.png" width={16} height={16} alt="Google" /> 
              {props.googleButtonText}
            </>
        }
      </Button>
    </div>
  );
}