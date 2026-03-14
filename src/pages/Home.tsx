import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { Card, CardContent } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import Empty from "../components/Empty"
import { AlertCircle, RefreshCw, Loader2, Utensils, Salad, IceCream, Wine, Star, CupSoda, Beer, Coffee, GlassWater, Search } from "lucide-react"

// Types
interface Category {
  id: number
  name: string
  slug: string
  icon_name: string
  dishes: { count: number }[]
}

interface Dish {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  is_featured: boolean
}

interface SearchResult extends Dish {
  categories?: {
    name: string
  } | null
}

const iconMap: Record<string, React.ComponentType<any>> = {
  salad: Salad,
  utensils: Utensils,
  "ice-cream": IceCream,
  wine: Wine,
  "cup-soda": CupSoda,
  beer: Beer,
  coffee: Coffee,
  "glass-water": GlassWater,
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredDishes, setFeaturedDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalItems, setTotalItems] = useState(0)
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true)
        try {
          const { data, error } = await supabase
            .from("dishes")
            .select("id, name, price, image_url, description, categories(name)")
            .ilike("name", `%${searchQuery}%`)
            .eq("is_available", true)
            .limit(5)
          
          if (error) throw error
          setSearchResults(data || [])
          setShowResults(true)
        } catch (error) {
          console.error("Error searching:", error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)
      
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*, dishes(count)")
        .order("display_order")

      if (categoriesError) throw categoriesError

      const { data: dishesData, error: dishesError } = await supabase
        .from("dishes")
        .select("*")
        .eq("is_featured", true)
        .eq("is_available", true)
        .limit(4)

      if (dishesError) throw dishesError
      
      // Get total count of available items
      const { count: dishesCount, error: countError } = await supabase
        .from("dishes")
        .select("*", { count: 'exact', head: true })
        .eq("is_available", true)

      if (!countError && dishesCount !== null) {
        setTotalItems(dishesCount)
      }

      if (categoriesData) {
        // Sort categories: food first, then beverages
        const sorted = [...categoriesData].sort((a, b) => {
          const isBeverage = (slug: string) => 
            slug.includes('bebida') || 
            slug.includes('vinho') || 
            slug.includes('destilado') || 
            slug.includes('suco') ||
            slug.includes('cerveja') ||
            slug.includes('drink') ||
            slug.includes('coquetel');

          const aIsBeverage = isBeverage(a.slug);
          const bIsBeverage = isBeverage(b.slug);
          
          if (aIsBeverage && !bIsBeverage) return 1;
          if (!aIsBeverage && bIsBeverage) return -1;
          return a.display_order - b.display_order;
        });
        setCategories(sorted);
      }
      if (dishesData) setFeaturedDishes(dishesData)
    } catch (error: any) {
      console.error("Error fetching data:", error)
      if (error.message === 'Failed to fetch' || error.message?.includes('NetworkError') || !window.navigator.onLine) {
         setError("Erro de conexão. Verifique se você está conectado à internet ou se algum bloqueador de anúncios está impedindo o acesso.")
      } else {
         setError("Não foi possível carregar o cardápio. Por favor, tente novamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
        <Button onClick={fetchData} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Tentar Novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative bg-secondary py-20 text-center text-secondary-foreground overflow-hidden">
        {/* Background Image with Fade Filter */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.jpeg" 
            alt="Restaurante Roma Ambiente" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/80 to-secondary/95 mix-blend-multiply" />
        </div>

        <div className="container relative z-10 px-4">
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm overflow-hidden border-4 border-primary shadow-xl">
             <img src="/logo.jpg" alt="Restaurante Romã Logo" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
             <Utensils className="h-16 w-16 text-primary hidden" />
          </div>
          <h1 className="mb-8 text-4xl font-bold font-serif md:text-6xl drop-shadow-lg text-primary">Restaurante Romã</h1>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                className="pl-10 h-12 bg-white/95 border-primary/20 focus:border-primary text-gray-800 placeholder:text-gray-500 shadow-lg"
                placeholder="Buscar pratos, bebidas..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowResults(true)}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              )}
            </div>
            
            {/* Total items count */}
            <div className="text-center mt-2 flex flex-col items-center gap-1">
              <span className="text-[10px] text-white/80 font-light">
                {totalItems} opções deliciosas disponíveis
              </span>
              <a 
                href="https://traeawszejt2.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-white underline hover:text-white/80 transition-colors"
              >
                Avaliar Restaurante
              </a>
            </div>

            {/* Autocomplete Results */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden z-50 text-left">
                {searchResults.map((dish) => (
                  <Link 
                    key={dish.id} 
                    to={`/prato/${dish.id}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    onClick={() => setShowResults(false)}
                  >
                    <img 
                      src={dish.image_url || "/logo.jpg"} 
                      alt={dish.name} 
                      className="h-10 w-10 rounded object-cover bg-gray-100"
                      onError={(e) => { e.currentTarget.src = "/logo.jpg" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{dish.name}</p>
                      <div className="flex items-center gap-2">
                         <p className="text-xs text-gray-500 truncate">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dish.price)}</p>
                         {dish.categories?.name && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="text-xs text-primary font-medium truncate">{dish.categories.name}</span>
                            </>
                         )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
             {showResults && searchQuery.length > 1 && searchResults.length === 0 && !isSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-xl border border-gray-100 p-4 text-center z-50">
                <p className="text-gray-500 text-sm">Nenhum produto encontrado</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container px-4">
        <h2 className="mb-8 text-center text-3xl font-bold font-serif text-secondary">Nosso Cardápio</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => {
            let iconName = category.icon_name
            
            // Fallback for beverage icons based on slug if default is used
            if (!iconName || iconName === 'utensils') {
              if (category.slug.includes('vinho')) iconName = 'wine'
              else if (category.slug.includes('cerveja')) iconName = 'beer'
              else if (category.slug.includes('destilado')) iconName = 'glass-water'
              else if (category.slug.includes('bebida') || category.slug.includes('suco') || category.slug.includes('drink') || category.slug.includes('coquetel')) iconName = 'cup-soda'
            }

            const Icon = iconMap[iconName] || Utensils
            return (
              <Link key={category.id} to={`/categoria/${category.slug}`}>
                <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-lg hover:border-secondary/50 bg-white">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-secondary/10 p-4 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-secondary transition-colors">{category.name}</h3>
                    <span className="text-xs text-gray-500 mt-1">{category.dishes[0]?.count || 0} itens</span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="container px-4">
        <h2 className="mb-8 text-center text-3xl font-bold font-serif text-secondary">Pratos em Destaque</h2>
        
        {featuredDishes.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {featuredDishes.map((dish) => (
              <Link key={dish.id} to={`/prato/${dish.id}`}>
                <Card className="overflow-hidden transition-all hover:shadow-lg group border-none ring-1 ring-gray-200 hover:ring-secondary/50 bg-white">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative h-48 w-full md:h-auto md:w-2/5 overflow-hidden">
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
                    <div className="flex flex-1 flex-col justify-between p-6 bg-white">
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-2">
                           <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-secondary transition-colors">{dish.name}</h3>
                           <span className="text-lg font-bold text-secondary whitespace-nowrap">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dish.price)}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-sm text-gray-600 mb-4">{dish.description}</p>
                      </div>
                      <div>
                          <Button variant="outline" size="sm" className="w-full md:w-auto text-secondary border-secondary hover:bg-secondary hover:text-white">
                              Ver Detalhes
                          </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Empty 
            title="Nenhum prato em destaque" 
            description="Explore nossas categorias acima para ver todas as delícias do nosso cardápio."
            icon={Star}
          />
        )}
      </section>
    </div>
  )
}