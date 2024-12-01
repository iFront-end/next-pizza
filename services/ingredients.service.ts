import {Ingredient} from "@prisma/client";

export const GET = async (): Promise<Ingredient[]> => {
  const data = await fetch(`/api/ingredients`)
  return await data.json()
}