"use client"

import { Timer, ChevronLeft, ChevronRightIcon, Check, CircleDashed } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"


export default function HistoryPage() {
  const router = useRouter()
  const hoje = new Date(Date.now())
  const lastSessions = [
    {
      id: 1,
      title: "Estudar Matemática",
      day: hoje.toLocaleDateString("PT-BR"),
      steps: [{
        title: "Tester",
        done: false,
        description: "Descrição da etapa acordtestear."
      },
      {
        title: "asdasds",
        done: true,
        description: "Descrição da etapa asdads."
      },
      ],
    },
    {
      id: 2,
      title: "Cortar cabelo",
      day: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString("PT-BR"),
      steps: [{
        title: "Acordar",
        done: true,
        description: "Descrição da etapa acordar."
      },
      {
        title: "Dormir",
        done: true,
        description: "Descrição da etapa dormir."
      },
      ],
    },
  ] as const

  return (
    <div className="flex h-full justify-center">
      <div className="flex flex-col gap-4 min-w-xl">
        <button type="button" onClick={() => router.back()} className="flex cursor-pointer gap-2">
          <ChevronLeft /> <p>Voltar</p>
        </button>
        <div className="flex items-center justify-center gap-2">
          <Timer />
          <h1 className="text-3xl font-bold">Sessões anteriores</h1>
        </div>
        <div className="flex flex-col gap-4">
          {lastSessions.map((session) => {
            let totalSteps = session.steps.length
            let doneSteps = 0;
            for (let i = 0; i < session.steps.length; i++) {
              const obj = session.steps[i] as any
              if (obj.done == true) {
                doneSteps++
              }
            }
            let isCompleted = totalSteps == doneSteps;
            return (
              <Dialog >
                <DialogTrigger render={
                  <Item variant="outline" render={
                    <a href="#">
                      <ItemMedia variant={"icon"}>
                        {isCompleted ? <Check /> : <CircleDashed />}
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{session.title}</ItemTitle>
                        <ItemDescription>{doneSteps}/{totalSteps}</ItemDescription>
                      </ItemContent><ItemActions>
                        {session.day}
                        <ChevronRightIcon className="size-4" />
                      </ItemActions>
                    </a>}
                  />
                }
                />
                <DialogContent >
                  <DialogHeader>
                    <DialogTitle>{session.title}</DialogTitle>
                    <DialogDescription>{session.day}</DialogDescription>
                  </DialogHeader>
                  <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4 flex flex-col gap-3">
                    {session.steps.map((step, index) => {
                      return (

                        <Field orientation="horizontal">
                          <Checkbox
                            className={"cursor-pointer"}
                            id={`checkbox-${step.title}-${index}`}
                            name={`checkbox-${step.title}-${index}`}
                            defaultChecked
                          />
                          <FieldContent>
                            <FieldLabel htmlFor={`checkbox-${step.title}-${index}`}>
                              {step.title}
                            </FieldLabel>
                            <FieldDescription>
                              {step.description}
                            </FieldDescription>
                          </FieldContent>
                        </Field>

                      )
                    })}
                    <DialogFooter className="flex flex-1 max-w-full justify-end">

                      <Button className={"w-full flex-1"}>
                        Salvar alterações
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>
      </div>
    </div>
  )
}
