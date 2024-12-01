import {FC, ReactElement} from "react";
import {cn} from "@/lib/utils";
import {Price} from "@/components/shared/price";
import {Button, Skeleton} from "@/components/ui";
import {Panel} from "@/components/shared/panel";
import {CheckoutItemDetails} from "@/components/shared/checkout-item-details";
import {Package, Percent, Truck} from "lucide-react";

type Props = {
  totalsAmount: number
  loading: boolean
  className?: string
}

export const CheckoutTotals: FC<Props> = ({ totalsAmount, loading, className }): ReactElement => {
  const vatTotal = (totalsAmount * 7) / 100
  const delivery = totalsAmount > 1000 ? 0 : 120
  const total = totalsAmount + vatTotal + delivery

  return (
    <Panel header={
      <div>
        <span className='text-xl'>Итого:</span>
        <div className='text-4xl font-extrabold'>
          {loading ? <Skeleton className='h-10 w-32'/> : <Price value={total}/>}
        </div>
      </div>
    } action={
      <div className='px-8 py-7 border-t border-gray-50'>
        <Button loading={loading} className='w-full'>Оформить заказ</Button>
      </div>
    } className={cn('w-[450px]', className)}>
      <div className='p-8'>
        <CheckoutItemDetails title={
          <div className='flex items-center gap-x-2'>
            <Package size={18} className='text-gray-400'/>
            <span className='text-md'>Стоимость товаров:</span>
          </div>
        } value={totalsAmount} className='mb-4' loading={loading}/>
        <CheckoutItemDetails title={
          <div className='flex items-center gap-x-2'>
            <Percent size={18} className='text-gray-400'/>
            <span className='text-md'>Налоги:</span>
          </div>
        } value={vatTotal} className='mb-4' loading={loading}/>
        <CheckoutItemDetails title={
          <div className='flex items-center gap-x-2'>
            <Truck size={18} className='text-gray-400'/>
            <span className='text-md'>Доставка:</span>
          </div>
        } value={delivery} loading={loading}/>
      </div>
    </Panel>
)
}