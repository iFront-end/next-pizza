import {CartDTO, CreateCartItemValues} from "@/lib/get-cart-details";

export const GET = async (): Promise<CartDTO> => {
  const data = await fetch(`https://next-pizza-iowqdn5xt-andreys-projects-803a3228.vercel.app/api/cart`)
  return await data.json()
}

export const POST = async (values: CreateCartItemValues): Promise<CartDTO> => {
  const data = await fetch(`https://next-pizza-iowqdn5xt-andreys-projects-803a3228.vercel.app/api/cart`, {
    method: 'POST',
    body: JSON.stringify(values)
  })
  return await data.json()
}

export const PATCH = async (id: number, quantity: number): Promise<CartDTO> => {
  const data = await fetch(`https://next-pizza-iowqdn5xt-andreys-projects-803a3228.vercel.app/api/cart/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity })
  })
  return await data.json()
}

export const DELETE = async (id: number): Promise<CartDTO> => {
  const data = await fetch(`https://next-pizza-iowqdn5xt-andreys-projects-803a3228.vercel.app/api/cart/${id}`, {
    method: 'DELETE'
  })
  return await data.json()
}