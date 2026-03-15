"use client"

import { Calendar, History, LogOut, Moon, Sparkles, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="flex items-center justify-between border-b px-6 py-4 w-full">
      <div className="flex items-center gap-2">
        <Sparkles />
        <span className="text-sm font-semibold">StepMind</span>
      </div>

      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button size="icon-lg" variant="ghost" aria-label="Calendário">
                <Calendar />
              </Button>
            }
          />
          <TooltipContent side="bottom">Calendário</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button size="icon-lg" variant="ghost" aria-label="Histórico">
                <History />
              </Button>
            }
          />
          <TooltipContent side="bottom">Histórico</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                size="icon-lg"
                variant="ghost"
                aria-label="Alternar tema"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              >
                {resolvedTheme === "light" ? <Moon /> : <Sun />}
              </Button>
            }
          />
          <TooltipContent side="bottom">Alternar tema</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button size="icon-lg" variant="ghost" aria-label="Sair">
                <LogOut />
              </Button>
            }
          />
          <TooltipContent side="bottom">Sair</TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}
