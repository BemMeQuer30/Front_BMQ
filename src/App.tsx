import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/404";
import Layout from "./components/layout";
import Products from "./pages/products";
import Orders from "./pages/orders";
import CartPage from "./pages/Cart";
import UserLayout from "./components/layout-user";
import Register from "./pages/Register";
import SkincarePage from "./pages/Skincare";
import PelePage from "./pages/Pele";
import OlhosPage from "./pages/Olhos";
import BocaPage from "./pages/Boca";
import VeganPage from "./pages/Vegan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={<ProtectedRoute element={<CartPage />} />}
          />
          <Route path="/skincare" element={<SkincarePage />} />
          <Route path="/pele" element={<PelePage />} />
          <Route path="/olhos" element={<OlhosPage />} />
          <Route path="/boca" element={<BocaPage />} />
          <Route path="/vegan" element={<VeganPage />} />
        </Route>

        <Route path="/admin" element={<ProtectedRoute element={<Layout />} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
