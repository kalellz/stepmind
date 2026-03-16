import { LoginForm } from "@/components/login-form"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex gap-2">
        <Sparkles />
        <Label className="text-md">StepMind</Label>
      </div>
      <div className="w-full max-w-sm md:max-w-xl">
        <LoginForm />
      </div>
    </div>
  )
}
