import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { Card, CardContent } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Loader2, ArrowLeft, AlertCircle, RefreshCw } from "lucide-react"

interface Dish {
  id: number
  name: string
  description: string
  price: number
  image_url: string
}

interface Category {
  id: number
  name: string
  slug: string
}

export default function CategoryPage() {
  const { slug } = useParams()
  const [category, setCategory] = useState<Category | null>(null)
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchData() {
    if (!slug) return

    try {
      setLoading(true)
      setError(null)
      // Get category first
      const { data: categoryData, error: catError } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single()

      if (catError) throw catError

      if (categoryData) {
        setCategory(categoryData)
        // Get dishes for this category
        const { data: dishesData, error: dishError } = await supabase
          .from("dishes")
          .select("*")
          .eq("category_id", categoryData.id)
          .eq("is_available", true)
          .order("price")
        
        if (dishError) throw dishError

        if (dishesData) setDishes(dishesData)
      }
    } catch (error: any) {
      console.error("Error fetching data:", error)
      if (error.message === 'Failed to fetch' || error.message?.includes('NetworkError') || !window.navigator.onLine) {
         setError("Erro de conexão. Verifique se você está conectado à internet ou se algum bloqueador de anúncios está impedindo o acesso.")
      } else {
         setError("Não foi possível carregar os pratos desta categoria.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col h-96 items-center justify-center p-4 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Ops! Algo deu errado</h2>
        <p className="text-gray-600 mb-6 max-w-md">{error}</p>
        <div className="flex gap-4">
            <Link to="/">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                </Button>
            </Link>
            <Button onClick={fetchData} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Tentar Novamente
            </Button>
        </div>
      </div>
    )
  }

  if (!category) {
    return <div className="p-8 text-center">Categoria não encontrada</div>
  }

  const isBeverage = 
    category.slug.includes('bebida') || 
    category.slug.includes('vinho') || 
    category.slug.includes('destilado') || 
    category.slug.includes('suco') ||
    category.slug.includes('cerveja') ||
    category.slug.includes('drink') ||
    category.slug.includes('coquetel');

  return (
    <div className="container px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold font-serif text-secondary">{category.name}</h1>
      </div>

      {isBeverage ? (
        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          {dishes.map((dish) => (
            <Link key={dish.id} to={`/prato/${dish.id}`}>
              <Card className="hover:shadow-md transition-shadow bg-white border-l-4 border-l-secondary/20 hover:border-l-secondary">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1 pr-4">
                     <h3 className="text-lg font-bold font-serif text-gray-900 group-hover:text-secondary transition-colors">{dish.name}</h3>
                     {dish.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{dish.description}</p>}
                  </div>
                  <div>
                    {dish.price > 0 ? (
                      <span className="text-lg font-bold text-secondary whitespace-nowrap">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dish.price)}
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-secondary whitespace-nowrap px-2 py-1 bg-secondary/10 rounded">
                        Sob Consulta
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish) => (
            <Link key={dish.id} to={`/prato/${dish.id}`}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg group">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={dish.image_url || "/logo.jpg"}
                    alt={dish.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/logo.jpg"
                    }}
                  />
                </div>
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-secondary transition-colors">{dish.name}</h3>
                    <span className="text-lg font-bold text-secondary whitespace-nowrap">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dish.price)}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-gray-600 flex-1">{dish.description}</p>
                  <Button className="w-full mt-2" variant="secondary">Ver Detalhes</Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
      
      {dishes.length === 0 && (
        <p className="text-center text-gray-500 py-12">Nenhum prato disponível nesta categoria no momento.</p>
      )}
    </div>
  )
}