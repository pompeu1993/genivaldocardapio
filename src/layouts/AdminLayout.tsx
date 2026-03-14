import { useEffect, useState } from "react"
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { Button } from "../components/ui/Button"
import { LayoutDashboard, UtensilsCrossed, List, LogOut, Wine } from "lucide-react"
import { cn } from "../lib/utils"

export function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admin/login")
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/admin/login")
      }
    } catch (error) {
      console.error("Error checking auth:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate("/admin/login")
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: List, label: "Categorias de Pratos", href: "/admin/categories" },
    { icon: UtensilsCrossed, label: "Pratos", href: "/admin/dishes" },
    { icon: List, label: "Categorias de Bebidas", href: "/admin/beverage-categories" },
    { icon: Wine, label: "Bebidas", href: "/admin/beverages" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold font-serif text-secondary">Romã Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                location.pathname.startsWith(item.href)
                  ? "bg-secondary/10 text-secondary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}