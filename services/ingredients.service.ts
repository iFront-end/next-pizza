import {Ingredient} from "@prisma/client";

export const GET = async (): Promise<Ingredient[]> => {
  const data = await fetch(`https://next-pizza-iowqdn5xt-andreys-projects-803a3228.vercel.app/api/ingredients`)
  return await data.json()
}