'use client'

import {FC, ReactElement, useEffect, useState} from 'react'
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Title} from "@/components/shared/title";
import {CountButton} from "@/components/shared/count-button";
import {Price} from "@/components/shared/price";
import {Trash2, X} from "lucide-react";

type Props = {
  imageUrl: string
  name: string
  price: number
  quantity: number
  details: string
  compact?: boolean
  onButtonClick?: (type: string) => void
  onIconTrashClick?: VoidFunction
  disabled?: boolean
  inline?: boolean
  className?: string
}

export const CartItem: FC<Props> = (
  { imageUrl, name, price, quantity, details, compact, onButtonClick, onIconTrashClick, disabled, inline, className }
): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(false)
  }, [quantity]);

  const handleButtonClick = (type: string) => {
    setLoading(true)
    onButtonClick?.(type)
  }

  return (
    <figure className={
          cn('bg-white p-5 flex items-start gap-x-6 relative',
          { 'items-center p-0': inline },
          {'opacity-40 cursor-pointer pointer-events-none': disabled },
          className
        )}>
      { disabled }
      <Image src={ imageUrl } alt={ name } width={ 65 } height={ 65 } quality={ 50 } priority={ true } />
      <figcaption className={ cn("w-full justify-between items-center", { 'flex': inline }) }>
        <div>
          <Title text={ name } size="xs" className="font-bold" />
          <p className="text-sm text-gray-400 max-w-80 pr-4">{ details }</p>
        </div>
        { compact ?
          <div className='flex flex-col font-bold items-end'>
            <Price value={price * quantity} className="font-bold relative top-px"/>
            <div className='text-gray-400 text-sm font-normal'>{ quantity } шт.</div>
          </div> :
          <div className={cn(
            "pt-3 mt-3 border-t border-gray-200 flex items-center justify-between",
            {'border-none pt-0 mt-0 gap-x-4': inline}
          )}>
            <CountButton loading={loading} value={quantity} onClick={type => handleButtonClick(type)}
                         className={cn({'order-2': inline})}/>
            {inline &&
              <X className="cursor-pointer opacity-40 order-3 hover:opacity-80" size={18} onClick={onIconTrashClick}/>}
            <div className={cn('flex items-center gap-x-3', {'mr-8': inline})}>
              <Price value={price} className="font-bold relative top-px"/>
              {!inline && <Trash2 className="cursor-pointer opacity-60" size={18} onClick={onIconTrashClick}/>}
            </div>
          </div>
        }
      </figcaption>
    </figure>
  )
}
