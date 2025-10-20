"use client"
import { createContext, useContext, useState } from "react"
import { SuccessAlert, ErrorAlert, AlertProps } from "@/components/Alerts"

type AlertType = "success" | "error"
type AlertOptions = Omit<AlertProps, "open" | "onOpenChange">

interface AlertContextType {
  showAlert: (type: AlertType, options: AlertOptions) => void
  hideAlert: () => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [currentAlert, setCurrentAlert] = useState<{
    type: AlertType
    options: AlertOptions
  } | null>(null)

  const showAlert = (type: AlertType, options: AlertOptions) => {
    setCurrentAlert({ type, options })
  }

  const hideAlert = () => {
    setCurrentAlert(null)
  }

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      
      {/* Success Alert */}
      <SuccessAlert
        open={currentAlert?.type === "success"}
        onOpenChange={(open) => !open && hideAlert()}
        {...(currentAlert?.type === "success" ? currentAlert.options : ({} as AlertOptions))}
      />
      
      {/* Error Alert */}
      <ErrorAlert
        open={currentAlert?.type === "error"}
        onOpenChange={(open) => !open && hideAlert()}
        {...(currentAlert?.type === "error" ? currentAlert.options : ({} as AlertOptions))}
      />
    </AlertContext.Provider>
  )
}

export function useAlert() {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider")
  }
  return context
}