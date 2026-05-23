import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react"

const CartContext = createContext()

export function CartProvider({ children }) {

  // LOAD CART FROM LOCAL STORAGE
  const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem("sahasra-cart")

    return savedCart
      ? JSON.parse(savedCart)
      : []
  })

  // SAVE CART TO LOCAL STORAGE
  useEffect(() => {

    localStorage.setItem(
      "sahasra-cart",
      JSON.stringify(cartItems)
    )

  }, [cartItems])

  // ADD TO CART
  const addToCart = (
    product,
    selectedWeight,
    quantity
  ) => {

    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.weight === selectedWeight.label
    )

    // IF PRODUCT ALREADY EXISTS
    if (existingItem) {

      setCartItems((prev) =>
        prev.map((item) =>

          item.id === product.id &&
          item.weight === selectedWeight.label

            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
              }

            : item
        )
      )

    } else {

      // ADD NEW ITEM
      setCartItems((prev) => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          weight: selectedWeight.label,
          quantity,
          price: selectedWeight.price,
          spice: product.spice,
        },
      ])
    }
  }

  // REMOVE FROM CART
  const removeFromCart = (
    id,
    weight
  ) => {

    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.weight === weight
          )
      )
    )
  }

  // UPDATE QUANTITY
  const updateQuantity = (
    id,
    weight,
    type
  ) => {

    setCartItems((prev) =>
      prev.map((item) => {

        if (
          item.id === id &&
          item.weight === weight
        ) {

          const newQuantity =
            type === "increase"
              ? item.quantity + 1
              : item.quantity - 1

          return {
            ...item,
            quantity:
              newQuantity < 1
                ? 1
                : newQuantity,
          }
        }

        return item
      })
    )
  }

  // CLEAR CART
  const clearCart = () => {
    setCartItems([])
  }

  // TOTAL PRICE
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  )

  // TOTAL ITEMS
  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
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