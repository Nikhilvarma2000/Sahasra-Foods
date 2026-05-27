import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  // This flag stops React from wiping your storage on page boot
  const [isLoaded, setIsLoaded] = useState(false)

  // 1. LOAD FROM LOCAL STORAGE: Runs exactly ONCE on startup
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("sahasra-cart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Error reading cart from localStorage", error)
    }
    // Storage has been safely read, now we can allow saving updates
    setIsLoaded(true)
  }, [])

  // 2. SAVE TO LOCAL STORAGE: Only triggers when items change AND initial load is complete
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("sahasra-cart", JSON.stringify(cartItems))
    }
  }, [cartItems, isLoaded])

  // ADD TO CART
  const addToCart = (product, selectedWeight = null, quantity = 1) => {
    let finalWeight = ""
    let finalPrice = 0
    let finalQty = quantity

    if (selectedWeight && typeof selectedWeight === "object") {
      finalWeight = selectedWeight.label
      finalPrice = selectedWeight.price
    } else {
      finalWeight = product.weight || "250g"
      finalPrice = product.price || product.basePrice || 0
      finalQty = product.quantity || 1
    }

    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.weight === finalWeight
    )

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id && item.weight === finalWeight
            ? { ...item, quantity: item.quantity + finalQty }
            : item
        )
      )
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          weight: finalWeight,
          quantity: finalQty,
          price: finalPrice,
          spice: product.spice || "Medium",
        },
      ])
    }
  }

  // REMOVE FROM CART
  const removeFromCart = (id, weight) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.weight === weight))
    )
  }

  // UPDATE QUANTITY
  const updateQuantity = (id, weight, type) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.weight === weight) {
            const newQuantity =
              type === "increase" ? item.quantity + 1 : item.quantity - 1
            return { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    )
  }

  // CLEAR CART
  const clearCart = () => {
    setCartItems([])
  }

  // TOTAL PRICE
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // TOTAL ITEMS COUNT
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}