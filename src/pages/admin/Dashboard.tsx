import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Utensils, List, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    dishes: 0,
    featured: 0
  })

  useEffect(() => {
    async function fetchStats() {
      const { count: categoriesCount } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true })

      const { count: dishesCount } = await supabase
        .from("dishes")
        .select("*", { count: "exact", head: true })

      const { count: featuredCount } = await supabase
        .from("dishes")
        .select("*", { count: "exact", head: true })
        .eq("is_featured", true)

      setStats({
        categories: categoriesCount || 0,
        dishes: dishesCount || 0,
        featured: featuredCount || 0
      })
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-serif text-secondary">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 font-sans">Total Categorias</CardTitle>
            <List className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.categories}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 font-sans">Total Pratos</CardTitle>
            <Utensils className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.dishes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 font-sans">Pratos em Destaque</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.featured}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity or Quick Actions could go here */}
    </div>
  )
}