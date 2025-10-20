"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod"
import { signIn } from "next-auth/react";
import { useAlert } from "@/hooks/alert-provider"
import { TextInput, EmailInput, PasswordInput, DividerOr, SocialButtons } from "@/components/AuthComponents";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement:boolean;
}

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreement?:string;
}

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  agreement: z.boolean().refine(val => val === true, { 
    message: "You must agree to the terms and conditions"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export default function SignUpPage() {
  const router = useRouter()
  const { showAlert } = useAlert();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const [signUpData, setSignUpData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreement:false
  })

  const [isSubmitting, setIsSubmitting] = useState({
    isGoogleSubmitting: false,
    isAppleSubmitting: false,
    isNormalSubmitting: false
  })

  // Clear error when user starts typing
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldErrors(prev => ({ ...prev, name: undefined }))
    setSignUpData(prev => ({
      ...prev,
      name: e.target.value 
    }))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldErrors(prev => ({ ...prev, email: undefined }))
    setSignUpData(prev => ({
      ...prev,
      email: e.target.value 
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldErrors(prev => ({ ...prev, password: undefined, confirmPassword: undefined }))
    setSignUpData(prev => ({
      ...prev,
      password: e.target.value 
    }))
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldErrors(prev => ({ ...prev, confirmPassword: undefined }))
    setSignUpData(prev => ({
      ...prev,
      confirmPassword: e.target.value 
    }))
  }

  const handleAgreementChange = (checked: boolean) => {
    setFieldErrors(prev => ({ ...prev, agreement: undefined }))
    setSignUpData(prev => ({
      ...prev,
      agreement: checked
    }))
  }

  const validateForm = (): boolean => {
    try {
      signUpSchema.parse(signUpData)
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
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signUpData.name,
          email: signUpData.email,
          password: signUpData.password
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error)
      }

      setSignUpData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreement:false
      })

      showAlert("success", {
        alertHeader: "Success!",
        alertDescription: "Your account has been created successfully. Please login",
        buttonOkayText: "Continue to Login",
        onOkay: () => router.replace("/sign-in")
      })
      
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
    } catch (error) {
      console.error(error)
      showAlert("error", {
        alertHeader: "Google Sign In Failed",
        alertDescription: "Please try again or use another method",
        buttonOkayText: "Try Again"
      })
    }finally{
      setIsSubmitting(prev => ({ ...prev, isGoogleSubmitting: false }))
    }
  }

  return (
    <>
      {/* Tabs-like header */}
      <div className="mb-4 grid grid-cols-2 rounded-full bg-slate-100 p-1 text-sm">
        <Link href="/sign-in" className="rounded-full px-3 py-2 text-center text-slate-600 hover:bg-slate-200">Sign in</Link>
        <Link href="/sign-up" className="rounded-full bg-slate-900 px-3 py-2 text-center text-white">Sign up</Link>
      </div>

      <form className="grid gap-3" onSubmit={handleSubmit}>
        <div>
          <TextInput
            placeholder="Enter your fullname"
            value={signUpData.name}
            onChange={handleNameChange}
            className={fieldErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>
          )}
        </div>

        <div>
          <EmailInput 
            placeholder="Enter your email"
            value={signUpData.email}
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
            value={signUpData.password}
            onChange={handlePasswordChange}
            className={fieldErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.password}</p>
          )}
        </div>

        <div>
          <PasswordInput 
            placeholder="Confirm password" 
            value={signUpData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={fieldErrors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <Checkbox 
              id="terms" 
              checked={signUpData.agreement}
              onCheckedChange={handleAgreementChange}
              className={fieldErrors.agreement ? "border-red-500 focus-visible:ring-red-500" : ""}
            /> 
            <span>I agree to the Terms & Privacy</span>
          </label>
            {fieldErrors.agreement && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.agreement}</p>
          )}
        </div>


        <Button 
          type="submit" 
          disabled={isSubmitting.isNormalSubmitting}
          className="mt-1 h-11 rounded-xl bg-slate-900 flex justify-center items-center text-white hover:bg-slate-900/90"
        >
          {isSubmitting.isNormalSubmitting ? <span className="loader"></span> : "Create account"}
        </Button>

        <p className="mt-1 text-xs text-slate-500">
          By continuing you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
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