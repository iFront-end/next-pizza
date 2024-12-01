import {PizzaSize, pizzaSizes, PizzaType} from "@/@constants/pizza";
import {Ingredient, ProductVariant} from "@prisma/client";

type TotalPriceProps = {
  type: PizzaType,
  size: PizzaSize,
  variants: ProductVariant[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
}

export const calcTotalPizzaPrice = (props: TotalPriceProps) => {
  const pizzaPrice = props.variants.find(variant => variant.pizzaType === props.type && variant.size === props.size)?.price || 0
  const ingredientsPrice = props.ingredients
    .filter(ingredient => props.selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)

  return pizzaPrice + ingredientsPrice
}

export const getAvailablePizzaSizes = (type: PizzaType, variants: ProductVariant[]) => {
  const filteredPizzaByType = variants.filter(variant => variant.pizzaType === type)
  return pizzaSizes.map(item => {
    return {
      name: item.name,
      value: item.value,
      disabled: !filteredPizzaByType.some(pizza => pizza.size === item.value)
    }
  })
}