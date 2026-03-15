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

  return (
    <PageContainer>
      <div className="flex items-center justify-center gap-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          checkedDates={checkedDates}
          className="w-80 rounded-lg border"
          captionLayout="dropdown"
        />
      </div>
    </PageContainer>
  )
}
