import { useEffect, useState } from "react";
import { CartContext } from "./cart-context";

const STORAGE_KEY = "trendora_cart";

function makeLineId(productId, size, color) {
  return [productId, size || "default", color || "default"].join("::");
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product, { size, color, qty = 1 } = {}) {
    const lineId = makeLineId(product.id, size, color);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.lineId === lineId);
      if (existing) {
        return prev.map((item) =>
          item.lineId === lineId ? { ...item, qty: item.qty + qty } : item,
        );
      }
      return [
        ...prev,
        {
          lineId,
          id: product.id,
          title: product.title,
          brand: product.brand,
          thumbnail: product.thumbnail || product.images?.[0],
          price: product.price,
          size: size || null,
          color: color || null,
          qty,
        },
      ];
    });
  }

  function removeFromCart(lineId) {
    setCartItems((prev) => prev.filter((item) => item.lineId !== lineId));
  }

  function updateQty(lineId, qty) {
    if (qty < 1) return removeFromCart(lineId);
    setCartItems((prev) =>
      prev.map((item) => (item.lineId === lineId ? { ...item, qty } : item)),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
