import {Ingredient} from "@prisma/client";

export const GET = async (): Promise<Ingredient[]> => {
  const data = await fetch(`/api/ingredients`)
  const res = await data.json()
  return res
}