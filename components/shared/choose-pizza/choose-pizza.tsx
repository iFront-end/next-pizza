import {FC, ReactElement, useMemo} from 'react'
import { cn } from '@/lib/utils'
import {Title} from "@/components/shared/title";
import {Button} from "@/components/ui";
import {ProductExtended} from "@/@types/prisma";
import {PizzaImage} from "@/components/shared/pizza-image";
import {VariantTaps} from "@/components/shared/viriant-taps";
import {PizzaSize, PizzaType, PizzaTypeMap, pizzaTypes} from "@/@constants/pizza";
import {IngredientItem} from "@/components/shared/ingredient-item";
import {useSet} from "react-use";
import {Price} from "@/components/shared/price";
import {calcTotalPizzaPrice} from "@/components/shared/choose-pizza/choose-pizza.service";
import {usePizzaOptions} from "@/components/shared/choose-pizza/use-pizza-options";

interface Props {
  product: ProductExtended
  onSubmit: (productId: number, ingredientsId: number[]) => void
  loading?: boolean
  className?: string
}

export const ChoosePizza: FC<Props> = ({ product, onSubmit, loading, className }): ReactElement => {
  const [selectedIngredients, { toggle: selectIngredient }] = useSet(new Set<number>([]));
  const { size, type, availableSizes, currentItemId, setSize, setType } = usePizzaOptions(product.variants)

  const totalPrice = useMemo(() => {
    return calcTotalPizzaPrice({
      type,
      size,
      variants: product.variants,
      ingredients: product.ingredients,
      selectedIngredients
    })
  }, [size, type, selectedIngredients])

  const onClickAddToCart = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients))
    }
  }

  return (
    <div className={cn('grid grid-cols-2', className)}>
      <PizzaImage imageUrl={ product.imageUrl } size={ size } />

      <div className="bg-[#F4F1EE] pt-10">
        <div className="flex flex-col overflow-y-auto scrollbar max-h-[550px] px-10 pb-2">
          <Title text={ product.name } size='lg' className="font-extrabold text-gray-800"/>
          <p className="text-md text-gray-600 mb-5 mt-1">
            { size } см, { PizzaTypeMap[type] } пицца
          </p>

          <VariantTaps items={ availableSizes } value={ size }
                       onVariantSelect={size => setSize(size as PizzaSize)} />
          <VariantTaps items={ pizzaTypes } value={ type }
                       onVariantSelect={type => setType(type as PizzaType)} className="mt-5" />

          <Title text='Добавить по вкусу' className='mb-4 mt-7 font-semibold text-lg' />
          <div className="grid grid-cols-3 gap-3 relative z-10">
            { product.ingredients.map(ingredient => (
              <IngredientItem key={ ingredient.id }
                              ingredient={ ingredient }
                              onClick={() => selectIngredient(ingredient.id)}
                              active={selectedIngredients.has(ingredient.id)} />
            )) }
          </div>
        </div>
        <div className="px-10 pb-10 pt-5">
          <Button className="w-full mt-auto rounded-full" onClick={ onClickAddToCart } loading={ loading }>
            Добавить в корзину за <Price value={ totalPrice } className='ml-2' />
          </Button>
        </div>
      </div>
    </div>
  )
}
