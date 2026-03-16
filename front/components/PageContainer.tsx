import { BackButton } from "./BackButton"

export function PageContainer({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col gap-4">
        <BackButton />
        {children}
      </div>
    </div>
  )
}
