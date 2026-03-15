"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group"
import { Eye, EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bem vindo de volta</h1>
                <p className="text-balance text-muted-foreground">
                  Faça login em sua conta StepMind
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="jonhdoe@email.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-xs underline-offset-2 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <InputGroup>
                  <InputGroupInput
                    type={isVisible ? "text" : "password"}
                    placeholder="********"
                  />
                  <InputGroupAddon align={"inline-end"}>
                    <InputGroupButton
                      size={"icon-xs"}
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <Button type="submit">Entrar agora</Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-neutral-950 md:block">
            <Image
              width={24}
              height={24}
              src="/logo.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-contain invert filter"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Ao clicar em entrar agora, você concorda com nossos{" "}
        <a href="#">Termos de serviço</a> e{" "}
        <a href="#">Políticas de privacidade</a>.
      </FieldDescription>
    </div>
  )
}
