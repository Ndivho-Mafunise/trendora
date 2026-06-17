import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "sonner";
import Home from "./pages/home";
import ProductDetails from "./pages/productDetails";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Profile from "./pages/profile";
import Nav from "./components/nav";
import { CartProvider } from "./context/CartContext";

function App() {
  const [products, setProducts] = useState([]);

  return (
    <CartProvider>
      <BrowserRouter>
        {/* Nav at the top so it's always visible */}
        <Nav />
        <Toaster position="bottom-right" theme="light" richColors closeButton />
        <Routes>
          <Route
            path="/"
            element={<Home setProducts={setProducts} products={products} />}
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
