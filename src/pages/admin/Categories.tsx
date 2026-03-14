import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Trash2, Plus, Loader2 } from "lucide-react"

interface Category {
  id: number
  name: string
  slug: string
  display_order: number
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("display_order")
      
      if (data) {
        // Filter OUT beverage categories (only food)
        const foodCats = data.filter(c => 
            !c.slug.includes('bebida') && !c.slug.includes('vinho')
        )
        setCategories(foodCats)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    setCreating(true)
    try {
      const slug = newCategoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
      const { error } = await supabase
        .from("categories")
        .insert([{
          name: newCategoryName,
          slug,
          display_order: categories.length + 1
        }])

      if (error) throw error

      setNewCategoryName("")
      fetchCategories()
    } catch (error) {
      console.error("Error creating category:", error)
      alert("Erro ao criar categoria. Verifique se o nome já existe.")
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return

    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id)

      if (error) throw error
      fetchCategories()
    } catch (error) {
      console.error("Error deleting category:", error)
      alert("Erro ao excluir categoria. Pode haver pratos vinculados.")
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-serif text-secondary">Gerenciar Categorias de Pratos</h1>

      <Card>
        <CardHeader>
          <CardTitle>Nova Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="flex gap-4">
            <Input
              placeholder="Nome da categoria"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              disabled={creating}
            />
            <Button type="submit" disabled={creating || !newCategoryName.trim()}>
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
              Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categorias Existentes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="text-center py-4">Carregando...</div>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-gray-500">/{category.slug}</p>
                  </div>
                  <Button variant="danger" size="icon" onClick={() => handleDelete(category.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {categories.length === 0 && <p className="text-center text-gray-500">Nenhuma categoria cadastrada.</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}