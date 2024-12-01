import {useCartStore} from "@/store/cart"
import {useEffect} from "react"

export const useCart = () => {
  const cartState = useCartStore(state => state)

  useEffect(() => {
    cartState.fetchCartItems()
  }, [])

  return cartState
}