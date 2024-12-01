import { FC, ReactElement } from 'react'
import { cn } from '@/lib/utils'
import {Title} from "@/components/shared/title";
import Image from "next/image";
import {Button} from "@/components/ui";
import {ProductExtended} from "@/@types/prisma";
import {Price} from "@/components/shared/price";

interface Props {
  product: ProductExtended
  onSubmit: VoidFunction
  price: number
  loading?: boolean
  className?: string
}

export const ChooseProduct: FC<Props> = ({ product, onSubmit, price, loading, className }): ReactElement => {
  return (
    <div className={cn('grid grid-cols-2', className)}>
      <div className="flex items-center justify-center">
        <Image src={ product.imageUrl } alt="pizza"
               priority={ true }
               width={ 300 } height={ 300 }
               className={cn('mt-[4%] ml-[4%]')} />
      </div>
      <div className="flex flex-col py-5 px-10 bg-[#F4F1EE]">
        <Title text={ product.name } size='lg' className="font-extrabold text-gray-800"/>
        <p className="text-md text-gray-600 mb-5 mt-1">{ product.description }</p>
        <Button onClick={ () => onSubmit() } className="w-full mt-auto" loading={ loading }>
          Добавить в корзину за <Price value={ price } className='ml-2' />
        </Button>
      </div>
    </div>
  )
}
