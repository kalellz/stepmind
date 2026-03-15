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

type HeaderAction = {
  label: string
  icon: ReactNode
  onClick?: () => void
}

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [auth] = useState(false)

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const themeAction: HeaderAction = {
    label: "Alternar tema",
    icon: resolvedTheme === "light" ? <Moon /> : <Sun />,
    onClick: toggleTheme,
  }

  const actions: HeaderAction[] = auth
    ? [
        { label: "Calendário", icon: <Calendar /> },
        { label: "Histórico", icon: <History /> },
        themeAction,
        { label: "Sair", icon: <LogOut /> },
      ]
    : [themeAction]

  return (
    <header className="flex w-full items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-2">
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