"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export type AlertProps = {
  alertHeader: string
  alertDescription: string
  buttonCancelText?: string
  buttonOkayText?: string
  onCancel?: () => void
  onOkay?: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SuccessAlert(props: AlertProps) {
  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-green-600">{props.alertHeader}</AlertDialogTitle>
          <AlertDialogDescription>{props.alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={props.onOkay}>
            {props.buttonOkayText || "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function ErrorAlert(props: AlertProps) {
  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">{props.alertHeader}</AlertDialogTitle>
          <AlertDialogDescription>{props.alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={props.onOkay}>
            {props.buttonOkayText || "Try Again"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}