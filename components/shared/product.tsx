'use client'

import React, { FC, ReactElement } from 'react'
import {ProductExtended} from "@/@types/prisma";
import {ChoosePizza} from "@/components/shared/choose-pizza";
import {ChooseProduct} from "@/components/shared/choose-product";
import {toast} from "@/hooks/use-toast";
import {useCartStore} from "@/store/cart";
import {useRouter} from "next/navigation";

interface Props {
  product: ProductExtended
  type: 'modal' | 'page'
}

export const Product: FC<Props> = ({ product, type }): ReactElement => {
  const state = useCartStore(state => state)
  const router = useRouter()

  const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
    try {
      const itemId = productVariantId ?? product.variants[0].id

      await state.addCartItem({ productVariantId: itemId, ingredients })

      const t = toast({
        title: `${ product.name } добавлен в корзину`
      })
      setTimeout(() => t.dismiss(), 4000)

      if (type === 'modal') {
        router.back()
      }
    } catch {
      const t = toast({
        variant: "destructive",
        title: "Ошибка добавления продукта в корзину"
      })
      setTimeout(() => t.dismiss(), 4000)
    }
  }

  return (
    <>
      { Boolean(product.variants[0].pizzaType) ? (
        <ChoosePizza product={ product } onSubmit={ onSubmit }
                     loading={ state.loading } />
      ) : (
        <ChooseProduct product={ product } onSubmit={ onSubmit }
                       loading={ state.loading }
                       price={ product.variants[0].price } />
      )}
    </>
  )
}
