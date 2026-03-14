import { LucideIcon, Utensils } from "lucide-react"

interface EmptyProps {
  title?: string
  description?: string
  icon?: LucideIcon
}

export default function Empty({ 
  title = "Nenhum item encontrado", 
  description = "Ainda não há itens cadastrados nesta seção.",
  icon: Icon = Utensils
}: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-secondary/10 p-6 rounded-full mb-4 text-secondary">
        <Icon className="h-12 w-12" />
      </div>
      <h3 className="text-xl font-bold font-serif text-secondary mb-2">{title}</h3>
      <p className="text-gray-500 max-w-xs mx-auto">{description}</p>
    </div>
  )
}
