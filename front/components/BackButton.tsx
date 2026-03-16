"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="flex cursor-pointer gap-2"
    >
      <ChevronLeft /> <p>Voltar</p>
    </button>
  )
}
