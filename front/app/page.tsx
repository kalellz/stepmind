"use client"

import { ArrowRightIcon, AudioLinesIcon } from "lucide-react"
import { useEffect, useState } from "react"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { ButtonGroup } from "@/components/ui/button-group"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { createTask } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function Page() {
  const { transcript, isMicrophoneAvailable, listening, resetTranscript } = useSpeechRecognition()
  const [textInput, setTextInput] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleAudioCapture = () => {
    if (isMicrophoneAvailable) {
      // Se está ouvindo, para de ouvir já que usuário clicou novamente no botão
      if (listening) {
        SpeechRecognition.stopListening()
        return
      }
      // Reseta o transcript antes de começar a ouvir novamente
      resetTranscript()
      SpeechRecognition.startListening({
        continuous: true,
        language: "pt-BR",
      })

      return
    }

    alert("Ligue o microfone para conseguir gravar audio.")
  }

  // Escuta todas as mudanças no transcript para usar no texto do input
  useEffect(() => {
    if (transcript) {
      setTextInput(transcript)
    }
  }, [transcript])

  async function handleSubmit() {
    if (!textInput.trim()) return

    setIsSaving(true)
    setError(null)

    try {
      await createTask(textInput)
      setTextInput("")
      router.push("/history")
    } catch (err) {
      console.error(err)
      setError("Não foi possível criar a tarefa. Tente novamente.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex h-full flex-col items-center p-6">
      <main className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">O que você quer fazer hoje?</h1>
        <p className="text-sm text-zinc-500">
          Descreva seu objetivo e a gente fragmenta em passos simples pra você.
        </p>

        <div className="mt-6 flex w-full max-w-2xl flex-col gap-2">
          <ButtonGroup className="[--radius:9999rem] w-full">
            <ButtonGroup className="w-full">
              <InputGroup>
                <InputGroupInput
                  placeholder={
                    listening
                      ? "Gravando seu áudio..."
                      : "Ex: preciso estudar matematica hoje, mas não sei como começar..."
                  }
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  disabled={listening || isSaving}
                />
                <InputGroupAddon align="inline-end">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <InputGroupButton
                          onClick={handleAudioCapture}
                          size="icon-xs"
                          data-active={listening}
                          className="data-[active=true]:bg-primary data-[active=true]:text-secondary dark:data-[active=true]:bg-primary dark:data-[active=true]:text-secondary"
                          aria-pressed={listening}
                        >
                          <AudioLinesIcon />
                        </InputGroupButton>
                      }
                    />
                    <TooltipContent>Gravar áudio</TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                aria-label="Send"
                size="icon"
                disabled={!textInput || isSaving}
                onClick={handleSubmit}
              >
                <ArrowRightIcon />
              </Button>
            </ButtonGroup>
          </ButtonGroup>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
      </main>
    </div>
  )
}


