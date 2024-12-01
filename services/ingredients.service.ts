import {Ingredient} from "@prisma/client";

export const GET = async (): Promise<Ingredient[]> => {
  const data = await fetch(`http://next-pizza.local/api/ingredients`)
  return await data.json()
}