"use client"
import Link from "next/link";
import { useState } from "react";
import { z } from "zod"
import { signIn } from "next-auth/react";
import { useAlert } from "@/hooks/alert-provider"
import { EmailInput, PasswordInput, DividerOr, SocialButtons } from "@/components/AuthComponents";
import { Button } from "@/components/ui/button";

type SignInData = {
  email: string;
  password: string;
}

type FieldErrors = {
  email?: string;
  password?: string;
}

const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function SignInPage() {
  const { showAlert } = useAlert();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const [signInData, setSignInData] = useState<SignInData>({
    email: "",
    password: ""
  })

  const [isSubmitting, setIsSubmitting] = useState({
    isGoogleSubmitting: false,
    isAppleSubmitting: false,
    isNormalSubmitting: false
  })

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldErrors(prev => ({ ...prev, email: undefined }))
    setSignInData(prev => ({
      ...prev,
      email: e.target.value 
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldErrors(prev => ({ ...prev, password: undefined, confirmPassword: undefined }))
    setSignInData(prev => ({
      ...prev,
      password: e.target.value 
    }))
  }

  const validateForm = (): boolean => {
    try {
      signInSchema.parse(signInData)
      setFieldErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: FieldErrors = {}
        error.issues.forEach((issue) => {
          const field = issue.path[0]
          if (field) {
            errors[field as keyof FieldErrors] = issue.message
          }
        })
        setFieldErrors(errors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(prev => ({ ...prev, isNormalSubmitting: true }))
    
    // Validate all fields
    if (!validateForm()) {
      setIsSubmitting(prev => ({ ...prev, isNormalSubmitting: false }))
      return
    }

    try {
      const result = await signIn("credentials", {
        email: signInData.email,
        password: signInData.password,
        redirect: false,
        redirectTo:"/dashboard"
      })

      if (!result || result.error || result.url?.includes("/api/auth/error")) {
        const msg = result?.error === "CredentialsSignin" ? "Invalid email or password" : "Something went wrong. Please try again."
        showAlert("error", { alertHeader: "Sign In Failed", alertDescription: msg, buttonOkayText: "Try Again" })
        setIsSubmitting(prev => ({ ...prev, isNormalSubmitting: false }))
        return
      }
      console.log(result)

      showAlert("success", {
        alertHeader: "Success!",
        alertDescription: "Successfully logged in.",
        buttonOkayText: "Get Started",
        onOkay: () => window.location.replace(result.url ?? "/dashboard")
      });

      setSignInData({
        email: "",
        password: ""
      });
      
    } catch (error) {
      showAlert("error", {
        alertHeader: "Sign Up Failed",
        alertDescription: error instanceof Error ? error.message : "Something went wrong",
        buttonOkayText: "Try Again"
      })
    } finally {
      setIsSubmitting(prev => ({ ...prev, isNormalSubmitting: false }))
    }
  }

  const handleGoogleAuth = async () => {
    setIsSubmitting(prev => ({ ...prev, isGoogleSubmitting: true }))
    try {
      await signIn("google", { redirectTo: "/dashboard" })
    } catch{
      showAlert("error", {
        alertHeader: "Google Sign In Failed",
        alertDescription: "Please try again or use another method",
        buttonOkayText: "Try Again"
      })
      setIsSubmitting(prev => ({ ...prev, isGoogleSubmitting: false }))
    }
  }

  return (
    <>
      {/* Tabs-like header */}
      <div className="mb-4 grid grid-cols-2 rounded-full bg-slate-100 p-1 text-sm">
        <Link href="/sign-up" className="rounded-full px-3 py-2 text-center text-slate-600 hover:bg-slate-200">Sign up</Link>
        <Link href="/sign-in" className="rounded-full bg-slate-900 px-3 py-2 text-center text-white">Sign in</Link>
      </div>

      <form className="grid gap-3" onSubmit={handleSubmit}>

        <div>
          <EmailInput 
            placeholder="Enter your email"
            value={signInData.email}
            onChange={handleEmailChange}
            className={fieldErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <PasswordInput 
            placeholder="Enter your password" 
            value={signInData.password}
            onChange={handlePasswordChange}
            className={fieldErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.password}</p>
          )}
        </div>

          <Button 
          type="submit" 
          disabled={isSubmitting.isNormalSubmitting}
          className="mt-1 h-11 rounded-xl bg-slate-900 flex justify-center items-center text-white hover:bg-slate-900/90"
        >
          {isSubmitting.isNormalSubmitting ? <span className="loader"></span> : "Login"}
        </Button>
        <p className="mt-1 text-xs text-slate-500">
          Don&apos;t Have an account? <Link href="/sign-up" className="underline">Sign-up</Link>.
        </p>
      </form>

      <DividerOr />
      <SocialButtons 
        handleGoogleAuth={handleGoogleAuth}
        isGoogleLoading={isSubmitting.isGoogleSubmitting}
        googleButtonText="Continue with Google"
      />
    </>
  );
}