import { FC, ReactElement } from "react"
import { cn } from "@/lib/utils"
import {ProductGroupList} from "@/components/shared/product-group-list";
import {Title} from "@/components/shared/title";
import {ProductCard} from "@/components/shared/product-card";
import {findPizza, GetSearchParams} from "@/lib/find-pizzas";

type Props = {
  searchParams: GetSearchParams
  className?: string
}

export const Listing: FC<Props> = async ({ searchParams, className }): Promise<ReactElement> => {
  const categories = await findPizza(searchParams)
/*  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variants: true
        }
      }
    }
  })*/

  return (
    <div className={cn('flex flex-col gap-y-5', className)}>
      {
        categories.map(category => (
          category.products?.length > 0 &&
          <ProductGroupList key={category.id} categoryId={(category.id).toString()}>
            <Title text={category.name} size="lg" className="font-extrabold mb-5" />
            <div className={ cn('w-full grid grid-cols-3 gap-[50px]') }>
              {
                category.products.map(product => (
                  <ProductCard key={ product.id }
                               id={ product.id.toString() }
                               name={ product.name }
                               price={ product.variants[0].price }
                               imageUrl={ product.imageUrl }
                               description={ product.description } />
                ))
              }
            </div>
          </ProductGroupList>
        ))
      }
    </div>
  )
}