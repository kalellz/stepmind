"use client"
import { PageContainer } from "@/components/PageContainer"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export default function CalendarPage() {
  const dates = [
    {
      id: "01",
      date: "2026-03-03",
    },
    {
      id: "02",
      date: "2026-03-05",
    },
  ]

  const checkedDates = dates
    .map((d) => {
      const [year, month, day] = d.date.split("-")
      const parsed = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      )
      return Number.isNaN(parsed.getTime()) ? null : parsed
    })
    .filter((d): d is Date => d !== null)

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [openDateModal, setOpenDateModal] = useState(false)

  const handleSelect = (d: Date | undefined) => {
    setDate(d)
    if (d) setOpenDateModal(true)
  }

  return (
    <PageContainer>
      <div className="flex items-center justify-center gap-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          checkedDates={checkedDates}
          className="w-80 rounded-lg border"
          captionLayout="dropdown"
        />
      </div>

      {openDateModal && date ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-background p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-xl font-semibold">Data selecionada</h1>
              <button
                onClick={() => setOpenDateModal(false)}
                className="rounded-md bg-muted px-3 py-1 text-sm font-medium hover:bg-muted/80"
              >
                Fechar
              </button>
            </div>

            <p className="mt-4 text-lg">
              {date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </div>
        </div>
      ) : null}
    </PageContainer>
  )
}
