import {prisma} from "@/prisma/prisma-client";

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export interface GetSearchParams {
  query?: string
  sortBy?: string
  sizes?: string
  types?: string
  ingredients?: string
  priceFrom?: string
  priceTo?: string
}

export const findPizza = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(',').map(Number)
  const pizzaTypes = params.types?.split(',').map(Number)
  const ingredientsIds = params.ingredients?.split(',').map(Number)
  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

  return prisma.category.findMany({
    include: {
      products: {
        orderBy: { id: 'desc' },
        where: {
          ingredients: ingredientsIds ? {
            some: {
              id: { in: ingredientsIds }
            }
          } : undefined,
          variants: {
            some: {
              size: { in: sizes },
              pizzaType: { in: pizzaTypes },
              price: { gte: minPrice, lte: maxPrice }
            }
          }
        },
        include: {
          ingredients: true,
          variants: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice
              }
            },
            orderBy: {
              price: 'asc'
            }
          }
        }
      }
    }
  })
}
