import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-t-roma-brown/20 bg-white py-6 text-center text-sm text-roma-brown">
        © {new Date().getFullYear()} Restaurante Romã. Todos os direitos reservados.
      </footer>
    </div>
  )
}
