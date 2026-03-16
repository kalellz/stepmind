"use client"

import { useEffect, useMemo, useState } from "react"
import { PageContainer } from "@/components/PageContainer"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import {
  CalendarMonthResponse,
  Task,
  createTask,
  fetchCalendarMonth,
  fetchTasksForDate,
  toggleStepDone,
} from "@/lib/api"

export default function CalendarPage() {
  const router = useRouter()
  const [month, setMonth] = useState(new Date())
  const [checkedDates, setCheckedDates] = useState<Date[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [openDateModal, setOpenDateModal] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [error, setError] = useState<string | null>(null)

  const selectedDateString = useMemo(() => {
    if (!selectedDate) return ""
    return selectedDate.toISOString().split("T")[0]
  }, [selectedDate])

  useEffect(() => {
    const loadMonth = async () => {
      try {
        const res = await fetchCalendarMonth(month.getFullYear(), month.getMonth() + 1)
        const data: CalendarMonthResponse = res.data
        const dates = Object.keys(data.days).map((day) => new Date(day))
        setCheckedDates(dates)
      } catch (err) {
        console.error(err)
      }
    }

    loadMonth()
  }, [month])

  useEffect(() => {
    if (!selectedDate) return
    const loadTasks = async () => {
      setIsLoading(true)
      try {
        const res = await fetchTasksForDate(selectedDateString)
        setTasks(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [selectedDate, selectedDateString])

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) setOpenDateModal(true)
  }

  const handleToggleStep = async (taskId: string, stepId: string, done: boolean) => {
    try {
      await toggleStepDone(taskId, stepId, done)
      setTasks((prev) =>
        prev.map((task) =>
          task.id !== taskId
            ? task
            : {
                ...task,
                steps: task.steps.map((step) =>
                  step.id === stepId ? { ...step, done } : step
                ),
              }
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreateTask = async () => {
    if (!prompt.trim() || !selectedDateString) return

    setIsLoading(true)
    setError(null)

    try {
      await createTask(prompt, selectedDateString)
      setPrompt("")
      // refresh tasks and calendar marks
      const res = await fetchTasksForDate(selectedDateString)
      setTasks(res.data)
      const monthRes = await fetchCalendarMonth(month.getFullYear(), month.getMonth() + 1)
      setCheckedDates(Object.keys(monthRes.data.days).map((d) => new Date(d)))
    } catch (err) {
      console.error(err)
      setError("Não foi possível criar a tarefa. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Calendário</h1>
          <Button variant="ghost" size="sm" onClick={() => router.push("/history")}>Ver histórico</Button>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          month={month}
          onMonthChange={(newMonth) => setMonth(newMonth)}
          onSelect={handleSelect}
          checkedDates={checkedDates}
          className="w-80 rounded-lg border"
          captionLayout="dropdown"
        />
      </div>

      <Dialog open={openDateModal} onOpenChange={setOpenDateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tasks - {selectedDate?.toLocaleDateString()}</DialogTitle>
            <DialogDescription>
              Selecione a data para ver e marcar o progresso das suas tarefas.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Field>
                <FieldLabel htmlFor="prompt">Criar task para esta data</FieldLabel>
                <FieldContent>
                  <input
                    id="prompt"
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    placeholder="Ex: Estudar para prova de Matemática"
                    className="w-full rounded-md border px-3 py-2"
                  />
                </FieldContent>
              </Field>
              <Button onClick={handleCreateTask} disabled={isLoading || !prompt.trim()}>
                Criar task
              </Button>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
            </div>

            <div className="space-y-4">
              {isLoading && <p className="text-sm text-muted-foreground">Carregando tarefas...</p>}
              {!isLoading && tasks.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhuma tarefa para essa data.</p>
              )}

              {tasks.map((task) => (
                <div key={task.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{task.title}</h2>
                    <span className="text-xs text-muted-foreground">{new Date(task.date).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2 space-y-2">
                    {task.steps.map((step) => (
                      <div key={step.id} className="flex items-start gap-2">
                        <Checkbox
                          checked={step.done}
                          onCheckedChange={(value) =>
                            handleToggleStep(task.id, step.id, Boolean(value))
                          }
                        />
                        <div>
                          <p className="font-medium">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  )
}
