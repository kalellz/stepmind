"use client"
import { useState, type ReactNode } from "react"
import { Calendar, History, LogOut, Moon, Sparkles, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname, useRouter } from "next/navigation"
import { authClient } from "@/lib/auth"

type HeaderAction = {
  label: string
  icon: ReactNode
  onClick: () => void
}

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const isLoginPage = usePathname().includes("/login")
  const isSignUpPage = usePathname().includes("/signup")
  const auth = !isLoginPage && !isSignUpPage
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const themeAction: HeaderAction = {
    label: "Alternar tema",
    icon: resolvedTheme === "light" ? <Moon /> : <Sun />,
    onClick: toggleTheme,
  }
  const router = useRouter()
  const handleSignOut = async () => {

    await authClient.signOut().then(() => router.push("/login"))
  }
  const actions: HeaderAction[] = auth
    ? [
      { label: "Calendário", icon: <Calendar />, onClick: () => router.push("/calendar") },
      { label: "Histórico", icon: <History />, onClick: () => router.push("/history") },
      themeAction,
      {
        label: "Sair", icon: <LogOut />, onClick: handleSignOut
      },
    ]
    : [themeAction]

  return (
    <header className="flex w-full items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80" onClick={() => router.push("/")}>
        <Sparkles />
        <span className="text-sm font-semibold">StepMind</span>
      </div>

      <div className="flex items-center gap-1">
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger
              render={
                <Button
                  size="icon-lg"
                  variant="ghost"
                  aria-label={action.label}
                  onClick={action.onClick}
                >
                  {action.icon}
                </Button>
              }
            />
            <TooltipContent side="bottom">{action.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </header>
  )
}