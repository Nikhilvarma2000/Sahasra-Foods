import { createContext, useContext, useState, useEffect, useMemo } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  // LOAD CARGO CONTENT FROM LOCAL STORAGE LAYER ON INSTANCE MOUNT
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem("sahasra_cart")
    return localData ? JSON.parse(localData) : []
  })

  // SYNC MUTATIONS INTO THE CLIENT DEVICE BROWSERS STORAGE CACHE
  useEffect(() => {
    localStorage.setItem("sahasra_cart", JSON.stringify(cartItems))
  }, [cartItems])

  // ── DYNAMIC ADDITION SYSTEM (ROBUST PLATFORM SYNCHRONIZATION) ──
  const addToCart = (product, weight, quantity = 1) => {
    setCartItems((prevItems) => {
      // DEFENSIVE: String casting protects comparisons against data variation across mobile browsers
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          String(item.id) === String(product.id) && 
          String(item.weight).trim() === String(weight.label).trim()
      )

      if (existingItemIndex > -1) {
        // Item matched inside state array map structure: increment counter values smoothly
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Fresh item sequence added: safe multi-item array distribution append array loop
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            type: product.type,
            spice: product.spice,
            weight: weight.label,
            price: weight.price,
            quantity: quantity,
          },
        ]
      }
    })
  }

  // SCRUB METHOD VIA SCOPED INDICES DATA MATCHES
  const removeFromCart = (id, weight) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(String(item.id) === String(id) && String(item.weight) === String(weight)))
    )
  }

  // QUANTITY MUTATORS CONSOLE
  const updateQuantity = (id, weight, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (String(item.id) === String(id) && String(item.weight) === String(weight)) {
          const calculatedQuantity = type === "increase" ? item.quantity + 1 : item.quantity - 1
          return {
            ...item,
            quantity: Math.max(1, calculatedQuantity),
          }
        }
        return item
      })
    )
  }

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [cartItems])

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)