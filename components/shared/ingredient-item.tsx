import {FC, memo, ReactElement} from 'react'
import { cn } from '@/lib/utils'
import Image from "next/image";
import {Price} from "@/components/shared/price";
import {CircleCheck} from "lucide-react";
import {Ingredient} from "@prisma/client";

type Props = {
  ingredient: Ingredient
  onClick?: VoidFunction
  active?: boolean
  className?: string
}

export const mIngredientItem: FC<Props> = ({ ingredient, onClick, active, className }): ReactElement => {
  return (
    <figure className={
      cn(
        'bg-white rounded-xl px-2.5 py-3 flex flex-col items-center border border-white cursor-pointer transition-all duration-300 relative',
        'shadow-[0_0_15px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_0_5px_1px_rgba(0,0,0,0.1)] top-0 hover:-top-px',
        className,
        { 'border-primary': active })
    } onClick={ onClick }>
      <Image src={ ingredient.imageUrl } alt={ ingredient.name } width={ 110 } height={ 110 } quality={ 90 } className='mb-1' />
      { active && <CircleCheck className='absolute top-2 right-2 text-primary' /> }
      <figcaption className='flex flex-col justify-center w-full items-center'>
        <div className='h-8 overflow-hidden text-center text-xs font-normal'>{ ingredient.name }</div>
        <Price value={ ingredient.price } className='text-md font-semibold' />
      </figcaption>
    </figure>
  )
}

export const IngredientItem = memo(mIngredientItem)