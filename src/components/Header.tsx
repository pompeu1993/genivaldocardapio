import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/Button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-b-roma-brown/20 bg-secondary text-secondary-foreground shadow-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex flex-col items-start">
           <span className="text-xl font-bold font-serif text-primary leading-none">Restaurante Romã</span>
           <span className="text-[10px] text-primary/80">Cardápio Digital</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Início
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Cardápio
          </Link>
          <Link to="/admin/login" className="text-sm font-medium hover:text-primary transition-colors">
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-primary hover:bg-secondary-dark hover:text-primary"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-roma-brown/20 bg-secondary px-4 py-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-base font-medium hover:text-primary transition-colors py-2 border-b border-secondary-light/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/" 
              className="text-base font-medium hover:text-primary transition-colors py-2 border-b border-secondary-light/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Cardápio
            </Link>
            <Link 
              to="/admin/login" 
              className="text-base font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
