import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PublicLayout } from "./layouts/PublicLayout"
import { AdminLayout } from "./layouts/AdminLayout"
import Home from "./pages/Home"
import CategoryPage from "./pages/CategoryPage"
import DishDetailsPage from "./pages/DishDetailsPage"
import AdminLogin from "./pages/admin/Login"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminCategories from "./pages/admin/Categories"
import AdminBeverageCategories from "./pages/admin/BeverageCategories"
import AdminDishes from "./pages/admin/Dishes"
import AdminBeverages from "./pages/admin/Beverages"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="categoria/:slug" element={<CategoryPage />} />
          <Route path="prato/:id" element={<DishDetailsPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> {/* Redirect /admin to /admin/dashboard? or just render dashboard */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="beverage-categories" element={<AdminBeverageCategories />} />
          <Route path="dishes" element={<AdminDishes />} />
          <Route path="beverages" element={<AdminBeverages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App