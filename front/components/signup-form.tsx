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

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
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
                                <Input id="name" type="text" placeholder="John Doe" required />
                            </Field>
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
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                                        <Input id="password" type="password" required />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="confirm-password">
                                            Confirmar Senha
                                        </FieldLabel>
                                        <Input id="confirm-password" type="password" required />
                                    </Field>
                                </Field>
                                <FieldDescription>
                                    Deve ter no mínimo 8 caracteres.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button type="submit">Criar conta</Button>
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
