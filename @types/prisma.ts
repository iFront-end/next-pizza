import {Ingredient, Product, ProductVariant} from "@prisma/client";

export type ProductExtended = Product & { variants: ProductVariant[]; ingredients: Ingredient[] }