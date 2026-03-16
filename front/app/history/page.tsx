"use client"

import { Timer, ChevronLeft, ChevronRightIcon, Check, CircleDashed } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { PageContainer } from "@/components/PageContainer"
import { useEffect, useState } from "react"
import { fetchHistory, HistoryResponse, toggleStepDone } from "@/lib/api"

export default function HistoryPage() {
  const router = useRouter()
  const [data, setData] = useState<HistoryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)

  const loadHistory = async (pageToLoad = 1) => {
    setIsLoading(true)
    try {
      const res = await fetchHistory(pageToLoad, 10)
      setData(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadHistory(page)
  }, [page])

  const handleToggleStep = async (taskId: string, stepId: string, done: boolean) => {
    try {
      await toggleStepDone(taskId, stepId, done)
      setData((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          tasks: prev.tasks.map((task) =>
            task.id !== taskId
              ? task
              : {
                  ...task,
                  steps: task.steps.map((step) =>
                    step.id === stepId ? { ...step, done } : step
                  ),
                }
          ),
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  const tasks = data?.tasks ?? []
  const totalPages = data?.totalPages ?? 1

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Timer />
          <h1 className="text-3xl font-bold">Sessões anteriores</h1>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {tasks.length === 0 && !isLoading ? (
          <p className="text-sm text-muted-foreground">Ainda não há sessões registradas.</p>
        ) : null}

        {tasks.map((session) => {
          const totalSteps = session.steps.length
          const doneSteps = session.steps.filter((step) => step.done).length
          const isCompleted = totalSteps > 0 && totalSteps === doneSteps

          return (
            <Dialog key={session.id}>
              <DialogTrigger
                render={
                  <Item variant="outline" render={<a href="#">
                    <ItemMedia variant={"icon"}>
                      {isCompleted ? <Check /> : <CircleDashed />}
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{session.title}</ItemTitle>
                      <ItemDescription>
                        {doneSteps}/{totalSteps}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      {new Date(session.date).toLocaleDateString("pt-BR")}
                      <ChevronRightIcon className="size-4" />
                    </ItemActions>
                  </a>} />
                }
              />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{session.title}</DialogTitle>
                  <DialogDescription>
                    {new Date(session.date).toLocaleDateString("pt-BR")}
                  </DialogDescription>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[40vh] overflow-y-auto px-4 flex flex-col gap-3">
                  {session.steps.map((step) => (
                    <Field key={step.id} orientation="horizontal">
                      <Checkbox
                        className="cursor-pointer"
                        id={`checkbox-${step.id}`}
                        name={`checkbox-${step.id}`}
                        checked={step.done}
                        onCheckedChange={(value) =>
                          handleToggleStep(session.id, step.id, Boolean(value))
                        }
                      />
                      <FieldContent>
                        <FieldLabel htmlFor={`checkbox-${step.id}`}>
                          {step.title}
                        </FieldLabel>
                        <FieldDescription>{step.description}</FieldDescription>
                      </FieldContent>
                    </Field>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )
        })}

        <div className="flex items-center justify-between gap-2">
          <button
            className="rounded-md border px-4 py-2 text-sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Anterior
          </button>
          <span className="text-sm text-muted-foreground">
            Página {page} de {totalPages}
          </span>
          <button
            className="rounded-md border px-4 py-2 text-sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Próxima
          </button>
        </div>
      </div>
    </PageContainer>
  )
}
