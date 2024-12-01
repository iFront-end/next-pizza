import {FC, ReactElement} from "react";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui";

type Props = {
  className?: string
}

export const CheckoutProductSkeleton: FC<Props> = ({ className }): ReactElement => {
  return (
    <div className={ cn('flex items-center justify-between', className) }>
      <div className='flex items-center gap-x-6'>
        <Skeleton className='w-[65px] h-[65px]' />
        <Skeleton className='w-44 h-5' />
      </div>
      <div className='flex items-center gap-x-4'>
        <Skeleton className='w-14 h-5 mr-5' />
        <Skeleton className='w-24 h-10' />
        <Skeleton className='w-5 h-5' />
      </div>
    </div>
  )
}