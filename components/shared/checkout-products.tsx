import {FC, ReactElement} from "react";
import {Panel} from "@/components/shared/panel";
import {Title} from "@/components/shared/title";
import {cn} from "@/lib/utils";
import {ClearCart} from "@/components/shared/clear-cart";
import {CartItem} from "@/components/shared/cart-item";
import {getCartItemDetails} from "@/lib/get-cart-item-details";
import {PizzaSize, PizzaType} from "@/@constants/pizza";
import {CheckoutState} from "@/lib/get-cart-details";
import {CheckoutProductSkeleton} from "@/components/shared/checkout-product-skeleton";

type Props = {
  removeCartItem: (id: number) => void
  updateItemQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  deletionIds: Set<number>
  items: CheckoutState['items']
  className?: string
}

export const CheckoutProducts: FC<Props> = ({ removeCartItem, updateItemQuantity, clearCart, deletionIds, items, className }): ReactElement => {
  const skeletonList = Array(3).fill(0)

  return (
    <Panel className={ cn('', className) } header={
      <Title text='1. Корзина' size='md' className='font-bold'/>
    } endAdornment={<ClearCart onClick={ clearCart }/>}>
      <div className='flex flex-col gap-y-8 p-8'>
        { Boolean(!items?.length) ?
          skeletonList.map((_, index) => <CheckoutProductSkeleton key={ index } />) :
          items.map(product => (
            <CartItem key={product.id}
                      imageUrl={product.imageUrl}
                      name={product.name}
                      price={product.price}
                      quantity={product.quantity}
                      details={getCartItemDetails(product.ingredients, product.pizzaType as PizzaType, product.pizzaSize as PizzaSize)}
                      disabled={deletionIds.has(product.id)}
                      onIconTrashClick={() => removeCartItem(product.id)}
                      onButtonClick={type => updateItemQuantity(product.id, type === 'minus' ? product.quantity - 1 : product.quantity + 1)}
                      inline={ true } />
          ))
        }
      </div>
    </Panel>
  )
}