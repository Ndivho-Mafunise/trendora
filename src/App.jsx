import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { useState } from "react";
import ProductDetails from "./pages/productDetails";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Profile from "./pages/profile";
import Nav from "./components/nav";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const cartCount = cartItems.length;

  return (
    <div>
      <BrowserRouter>
        {/* Nav at the top so it's always visible */}
        <Nav cartCount={cartCount} />
        <Routes>
          <Route
            path="/"
            element={<Home setProducts={setProducts} products={products} />}
          />
          <Route
            path="/productDetails"
            element={<ProductDetails addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
