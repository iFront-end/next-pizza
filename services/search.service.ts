import {Product} from "@/interfaces/product";

export const GET = async (query: string): Promise<Product[]> => {
  const data = await fetch(`https://next-pizza-iowqdn5xt-andreys-projects-803a3228.vercel.app/api/products/search?query=${query}`)
  return await data.json()
}