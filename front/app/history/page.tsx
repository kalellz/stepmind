"use client"

import type { Route } from "next"
import { MessageCircle, Timer, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { PageContainer } from "@/components/PageContainer"

export default function HistoryPage() {
  const router = useRouter()

  const lastSessions = [
    {
      id: 1,
      title: "Estudar Matemática",
      day: "03/15/2026",
      steps: "3/6",
    },
    {
      id: 2,
      title: "Estudar Matemática",
      day: "03/15/2026",
      steps: "3/3",
    },
  ]

  return (
    <PageContainer>
      <div className="flex items-center justify-center gap-2">
        <Timer />
        <h1 className="text-3xl font-bold">Sessões anteriores</h1>
      </div>
      <div className="flex flex-col gap-4">
        {lastSessions.map((session) => {
          const [currentSteps, totalSteps] = session.steps
            .split("/")
            .map((value) => Number(value.trim()))
          const isCompleted =
            Number.isFinite(currentSteps) &&
            Number.isFinite(totalSteps) &&
            currentSteps === totalSteps

          return (
            <button
              type="button"
              key={session.id}
              onClick={() => router.push(`/history-${session.id}` as Route)}
              className={`flex w-full cursor-pointer items-center justify-between rounded-4xl border p-4 text-left ${
                isCompleted
                  ? "border-emerald-600/40 bg-emerald-950/30"
                  : "border-foreground bg-muted-foreground/10"
              }`}
            >
              <div className="flex gap-3">
                <div
                  className={`flex items-center justify-center rounded-3xl p-3 ${
                    isCompleted ? "bg-emerald-950" : "bg-muted"
                  }`}
                >
                  <MessageCircle
                    className={isCompleted ? "text-emerald-500" : "text-muted-foreground"}
                  />
                </div>
                <div className="flex flex-col">
                  <h2>{session.title}</h2>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <p>{session.day}</p>·<p>{session.steps}</p>
                  </div>
                </div>
              </div>
              <ChevronRight />
            </button>
          )
        })}
      </div>
    </PageContainer>
  )
}
