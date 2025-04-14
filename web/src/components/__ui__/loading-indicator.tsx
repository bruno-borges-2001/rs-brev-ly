import { cn } from "../../lib/utils";

export default function LoadingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn("h-8 w-8 border-2 border-b-transparent rounded-full animate-spin", className)} />
  )
}