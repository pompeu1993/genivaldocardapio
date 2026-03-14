import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Trash2, Plus, Loader2, Image as ImageIcon, Edit2, Wand2 } from "lucide-react"
import { getDishImage } from "../../lib/imageService"

interface Dish {
  id: number
  name: string
  description: string
  price: number
  category_id: number
  is_available: boolean
  image_url: string | null
}

interface Category {
  id: number
  name: string
  slug: string
}

export default function AdminDishes() {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDish, setEditingDish] = useState<Dish | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image_url: "",
    is_featured: false
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (editingDish) {
      setFormData({
        name: editingDish.name,
        description: editingDish.description,
        price: editingDish.price.toString(),
        category_id: editingDish.category_id.toString(),
        image_url: editingDish.image_url || "",
        is_featured: editingDish.is_featured
      })
      setIsModalOpen(true)
    } else {
      setFormData({ name: "", description: "", price: "", category_id: "", image_url: "", is_featured: false })
    }
  }, [editingDish])

  async function fetchData() {
    try {
      setError(null)
      const [categoriesRes, dishesRes] = await Promise.all([
        supabase.from("categories").select("*").order("name"),
        supabase.from("dishes").select("*").order("created_at", { ascending: false })
      ])
      
      if (categoriesRes.error) throw categoriesRes.error
      if (dishesRes.error) throw dishesRes.error
      
      if (categoriesRes.data) {
        // Filter OUT beverage categories (only food)
        const foodCats = categoriesRes.data.filter(c => 
            !c.slug.includes('bebida') && 
            !c.slug.includes('vinho') &&
            !c.slug.includes('cerveja') &&
            !c.slug.includes('drink') &&
            !c.slug.includes('coquetel')
        )
        setCategories(foodCats)

        if (dishesRes.data) {
            // Filter dishes that belong to food categories
            const foodCatIds = foodCats.map(c => c.id)
            const foodDishes = dishesRes.data.filter(d => foodCatIds.includes(d.category_id))
            setDishes(foodDishes)
        }
      }
    } catch (error: any) {
      console.error("Error fetching data:", error)
      setError("Erro ao carregar dados. Verifique sua conexão ou se há bloqueadores de anúncios ativos.")
    } finally {
      setLoading(false)
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return

    setUploading(true)
    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    try {
      const { error: uploadError } = await supabase.storage
        .from('dishes')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('dishes').getPublicUrl(filePath)
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }))
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Erro ao fazer upload da imagem.")
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      let finalImageUrl = formData.image_url

      // Se não houver imagem definida, buscar automaticamente
      if (!finalImageUrl && !editingDish) {
        try {
          finalImageUrl = await getDishImage(formData.name)
        } catch (err) {
          console.error("Failed to generate image", err)
        }
      } else if (!finalImageUrl && editingDish && !editingDish.image_url) {
         try {
            finalImageUrl = await getDishImage(formData.name)
         } catch (err) {
            console.error("Failed to generate image", err)
         }
      }

      if (editingDish) {
        // Update existing dish
        const { error } = await supabase
          .from("dishes")
          .update({
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category_id: parseInt(formData.category_id),
            image_url: finalImageUrl || null,
            is_featured: formData.is_featured
          })
          .eq("id", editingDish.id)

        if (error) throw error
      } else {
        // Create new dish
        const { error } = await supabase
          .from("dishes")
          .insert([{
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category_id: parseInt(formData.category_id),
            image_url: finalImageUrl || null,
            is_featured: formData.is_featured
          }])

        if (error) throw error
      }

      setFormData({ name: "", description: "", price: "", category_id: "", image_url: "" })
      setIsModalOpen(false)
      setEditingDish(null)
      fetchData()
    } catch (error) {
      console.error("Error saving dish:", error)
      alert("Erro ao salvar prato.")
    } finally {
      setSaving(false)
    }
  }

  function handleEdit(dish: Dish) {
    setEditingDish(dish)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingDish(null)
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja excluir este prato?")) return

    try {
      const { error } = await supabase.from("dishes").delete().eq("id", id)
      if (error) throw error
      fetchData()
    } catch (error) {
      console.error("Error deleting dish:", error)
      alert("Erro ao excluir prato.")
    }
  }

  const filteredDishes = selectedCategory === "all" 
    ? dishes 
    : dishes.filter(dish => dish.category_id.toString() === selectedCategory)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold font-serif text-secondary">Gerenciar Pratos</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select 
            className="flex h-10 w-full md:w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas as Categorias</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <Button onClick={() => { setEditingDish(null); setIsModalOpen(true); }} className="whitespace-nowrap">
            <Plus className="h-4 w-4 mr-2" />
            Novo Prato
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {isModalOpen && (
        <Card className="mb-8 border-secondary/20 bg-secondary/5">
          <CardHeader>
            <CardTitle>{editingDish ? "Editar Prato" : "Adicionar Novo Prato"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preço (R$)</label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoria</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição</label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Imagem</label>
                <div className="flex gap-4 items-center">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                {formData.image_url && (
                  <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="h-20 w-20 object-cover rounded-md mt-2" 
                    onError={(e) => {
                      e.currentTarget.src = "/logo.jpg"
                    }}
                  />
                )}
                {!formData.image_url && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <ImageIcon className="h-3 w-3" />
                        Sem imagem: será exibido o logo padrão
                    </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                />
                <label htmlFor="is_featured" className="text-sm font-medium cursor-pointer">
                  Destacar este prato na página inicial
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="ghost" onClick={handleCloseModal}>Cancelar</Button>
                <Button type="submit" disabled={saving || uploading}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingDish ? "Salvar Alterações" : "Criar Prato"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDishes.map((dish) => (
          <Card key={dish.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold truncate pr-2">{dish.name}</h3>
                <span className="font-semibold text-secondary">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dish.price)}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {categories.find(c => c.id === dish.category_id)?.name || 'Sem categoria'}
              </p>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{dish.description}</p>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(dish)}>
                  <Edit2 className="h-4 w-4 text-blue-600" />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(dish.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
