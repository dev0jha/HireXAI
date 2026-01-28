interface DashTitleShellProps {
  title: string
  description: string
}

export default function DashTitleShell({ title, description }: DashTitleShellProps) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold line-clamp-4 text-white">{title}</h1>
      <p className="text-muted-foreground mt-1 text-md">{description}</p>
    </div>
  )
}
