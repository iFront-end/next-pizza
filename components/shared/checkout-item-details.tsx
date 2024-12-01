import {FC, ReactElement} from "react";
import {cn} from "@/lib/utils";
import {Price} from "@/components/shared/price";
import {Skeleton} from "@/components/ui";

type Props = {
  title: ReactElement
  value: number
  loading: boolean
  className?: string
}

export const CheckoutItemDetails: FC<Props> = ({ title, value, loading, className }): ReactElement => {
  return (
    <div className={ cn('flex items-center justify-between', className) }>
      { title }
      { loading ? <Skeleton className='h-5 w-16' /> : <Price value={ value } className='text-md font-bold' /> }
    </div>
  )
}