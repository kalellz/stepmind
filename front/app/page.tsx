"use client"

import { Mic, Pause, Play, Square } from "lucide-react"
import { useEffect, useState } from "react"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function Page() {
  const [objective, setObjective] = useState("")
  const [hasRecordingStarted, setHasRecordingStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  useEffect(() => {
    setObjective(transcript)
  }, [transcript])

  const handleStartRecording = () => {
    SpeechRecognition.startListening({ continuous: true, interimResults: true, language: "pt-BR" })
    setHasRecordingStarted(true)
    setIsPaused(false)
  }

  const handlePauseRecording = () => {
    SpeechRecognition.stopListening()
    setIsPaused(true)
  }

  const handleResumeRecording = () => {
    SpeechRecognition.startListening({ continuous: true, interimResults: true, language: "pt-BR" })
    setIsPaused(false)
  }

  const handleFinalizeRecording = () => {
    SpeechRecognition.stopListening()
    setHasRecordingStarted(false)
    setIsPaused(false)
  }

  return (
    <div className="flex h-full flex-col items-center p-6">
      <main className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">O que você quer fazer hoje?</h1>
        <p className="text-sm text-zinc-500">Descreva seu objetivo e a gente fragmenta em passos simples pra você.</p>

        <div className="mt-6 flex w-full max-w-2xl flex-col gap-2">
          <Input
            type="text"
            value={objective}
            onChange={(event) => setObjective(event.target.value)}
            placeholder="ex: preciso estudar matematica hoje, mas não sei como começar..."
          />

          <div className="flex flex-wrap items-center gap-2 justify-end">
            {!hasRecordingStarted && (
              <Button
                type="button"
                variant="outline"
                onClick={handleStartRecording}
                disabled={!browserSupportsSpeechRecognition}
              >
                <Mic />
                Gravar áudio
              </Button>
            )}

            {hasRecordingStarted && !isPaused && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePauseRecording}
                  disabled={!browserSupportsSpeechRecognition}
                >
                  <Pause />
                  Parar
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleFinalizeRecording}
                  disabled={!browserSupportsSpeechRecognition}
                >
                  <Square />
                  Finalizar
                </Button>
              </>
            )}

            {hasRecordingStarted && isPaused && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResumeRecording}
                  disabled={!browserSupportsSpeechRecognition}
                >
                  <Play />
                  Continuar
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleFinalizeRecording}
                  disabled={!browserSupportsSpeechRecognition}
                >
                  <Square />
                  Finalizar
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
