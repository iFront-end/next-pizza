'use client'

import {FC, PropsWithChildren, ReactElement, ReactNode} from 'react'
import { cn } from '@/lib/utils'
import {
  Sheet, SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import * as React from "react";
import {Button} from "@/components/ui";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {Price} from "@/components/shared/price";
import {CartItem} from "@/components/shared/cart-item";
import {getCartItemDetails} from "@/lib/get-cart-item-details";
import {PizzaSize, PizzaType} from "@/@constants/pizza";
import {CartEmpty} from "@/components/shared/cart-empty";
import {useRouter} from "next/navigation";
import {useCart} from "@/hooks/useCart";

interface Props {
  children: ReactNode
  className?: string
}

export const CartSheet: FC<PropsWithChildren<Props>> = ({ children, className }): ReactElement => {
  const cartState = useCart()
  const router = useRouter()

  const updateProductCart = async (id: number, quantity: number, type: string) => {
    await cartState.updateItemQuantity(id, type === 'minus' ? quantity - 1 : quantity + 1)
  }

  const removeProductCart = async (id: number) => {
    await cartState.removeCartItem(id)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{ children }</SheetTrigger>
      <SheetContent  className={ cn('p-0 flex flex-col gap-0 bg-[#F4F1EE] font-nunito', className) }>
        <SheetHeader className={ cn('p-4', { 'hidden': cartState.totalAmount === 0 }) }>
          <SheetTitle className="font-bold text-xl">Корзина</SheetTitle>
          <SheetDescription>
            В корзине { cartState.items?.length } товара
          </SheetDescription>
        </SheetHeader>

        <div className={cn(
                'flex flex-col gap-y-3 flex-grow overflow-y-auto pb-5 scrollbar',
                { 'justify-center': cartState.totalAmount === 0 }) }>
          { cartState.totalAmount === 0 &&
            (<CartEmpty>
              <SheetClose>
                <Button className="w-[230px] mt-9">
                  <ArrowLeft size={ 18 } className="mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </CartEmpty>)
          }
          { cartState.items.map(item => (
            <CartItem
              key={ item.id }
              name={ item.name }
              imageUrl={ item.imageUrl }
              price={ item.price }
              details={ getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize) }
              disabled={ cartState.deletionIds.has(item.id) }
              onIconTrashClick={ () => removeProductCart(item.id) }
              onButtonClick={ type => updateProductCart(item.id, item.quantity, type) }
              quantity={ item.quantity } /> ))
          }
        </div>

        <SheetFooter className={cn('mt-auto bg-white py-7 px-8 flex gap-y-5 sm:flex-col sm:space-x-0',
          {'hidden': cartState.totalAmount === 0}) }>
          <div className="flex justify-between items-center w-full">
            <span>Итого:</span>
            <span className="font-bold text-lg"><Price value={ cartState.totalAmount }/></span>
          </div>
          <Button className='w-full flex items-center relative font-bold lg:ml-0'
                  onClick={ () => router.push('/checkout') }
                  loading={ cartState.loading }>
            Оформить заказ
            <ArrowRight size={20} className="absolute right-10"/>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
