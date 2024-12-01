import {Product} from "@/interfaces/product";

export const GET = async (query: string): Promise<Product[]> => {
  const data = await fetch(`/api/products/search?query=${query}`)
  return await data.json()
}