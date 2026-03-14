import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { Button } from "../components/ui/Button"
import { Loader2, ArrowLeft, Clock, ChefHat, MessageCircle } from "lucide-react"

interface Dish {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  ingredients: string
  preparation_time: number
  category_id: number
}

export default function DishDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dish, setDish] = useState<Dish | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchData() {
    if (!id) return

    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await supabase
        .from("dishes")
        .select("*")
        .eq("id", id)
        .single()

      if (fetchError) throw fetchError
      if (data) setDish(data)
    } catch (error: any) {
      console.error("Error fetching dish:", error)
      if (error.message === 'Failed to fetch' || error.message?.includes('NetworkError') || !window.navigator.onLine) {
         setError("Erro de conexão. Verifique se você está conectado à internet ou se algum bloqueador de anúncios está impedindo o acesso.")
      } else {
         setError("Não foi possível carregar o prato. Por favor, tente novamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

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
            <Button onClick={() => navigate(-1)} variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
            </Button>
            <Button onClick={fetchData} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Tentar Novamente
            </Button>
        </div>
      </div>
    )
  }

  if (!dish) {
    return <div className="p-8 text-center">Prato não encontrado</div>
  }

  return (
    <div className="bg-white min-h-[calc(100vh-64px)]">
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img
          src={dish.image_url || "/logo.jpg"}
          alt={dish.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/logo.jpg"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Link to="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} className="absolute top-4 left-4 z-10">
          <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container">
            <h1 className="text-3xl md:text-5xl font-bold font-serif mb-2 text-shadow text-white inline-block bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">{dish.name}</h1>
            <div className="mt-2">
                <p className="text-2xl md:text-3xl font-bold text-black inline-block bg-white/95 px-4 py-1 rounded-full shadow-lg">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dish.price)}
                </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 md:py-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold font-serif text-secondary mb-4">Sobre o Prato</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{dish.description}</p>
            </section>

            {dish.ingredients && (
              <section>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-secondary" />
                  Ingredientes Principais
                </h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {dish.ingredients}
                </p>
              </section>
            )}
          </div>

          <div className="space-y-6">
             <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/10">
                <div className="flex items-center gap-3 mb-4 text-secondary">
                  <Clock className="h-6 w-6" />
                  <span className="font-semibold">Tempo de Preparo</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{dish.preparation_time || 20} <span className="text-base font-normal text-gray-500">min</span></p>
             </div>
             
             <Button 
               className="w-full h-12 text-lg gap-2 bg-green-600 hover:bg-green-700 text-white" 
               size="lg"
               onClick={() => window.open(`https://wa.me/5512997034479?text=${encodeURIComponent(`Olá, gostaria de pedir o prato: ${dish.name}`)}`, '_blank')}
             >
               <MessageCircle className="h-5 w-5" />
               Pedir Via Whatsapp
             </Button>
          </div>
        </div>
      </div>
    </div>
  )
}