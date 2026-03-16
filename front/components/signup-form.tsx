"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { authClient } from "@/lib/auth"

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [name, setName] = useState<string>("")
    const [isVisible, setIsVisible] = useState<boolean>(true)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    async function handleSignUp() {
        if (password == confirmPassword && name != "" && email != "" && password != "") {
            await authClient.signUp.email({
                email: email,
                password: password,
                name: name
            }).catch((e) => console.log(e)).then(() => alert("account created"))

        }
        if (password != confirmPassword) {
            alert("password dont match")
        }
        return;
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Criar uma nova conta</CardTitle>
                    <CardDescription>
                        Digite suas informações abaixo para se registrar na StepMind
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="jonhdoe@email.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                type={isVisible ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
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
                                        <FieldLabel htmlFor="confirm-password">
                                            Confirmar Senha
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                type={isVisible ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="********"
                                            />
                                        </InputGroup>
                                    </Field>
                                </Field>
                                <FieldDescription>
                                    Deve ter no mínimo 8 caracteres.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button onClick={handleSignUp}>Criar conta</Button>
                                <FieldDescription className="text-center">
                                    Já tem uma conta? <a href="/login">Entre aqui.</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                Ao clicar em continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
                e nossa  <a href="#">Política de Privacidade</a>.
            </FieldDescription>
        </div>
    )
}
