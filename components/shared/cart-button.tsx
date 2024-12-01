'use client'

import { FC, ReactElement } from 'react'
import { cn } from '@/lib/utils'
import {Price} from "@/components/shared/price";
import {ArrowRight, ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui";
import {useCartStore} from "@/store/cart";
import {CartSheet} from "@/components/shared/cart-sheet";

interface Props {
  className?: string
}

export const CartButton: FC<Props> = ({ className }): ReactElement => {
  const cartState = useCartStore(state => state)

  return (
    <CartSheet>
      <Button className={ cn('group relative', {'min-w-[120px]' : cartState.loading}, className) } loading={ cartState.loading }>
        <b><Price value={ cartState.totalAmount }/></b>
        <span className="h-6 w-px bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart className="h-4 w-5" strokeWidth={2} />
          <b>{ cartState.items?.length }</b>
        </div>
        <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100" />
      </Button>
    </CartSheet>
  )
}
