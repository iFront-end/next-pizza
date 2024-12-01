import { FC, ReactElement } from 'react'
import { cn } from '@/lib/utils'
import Link from "next/link";
import Image from "next/image";
import {Title} from "@/components/shared/title";
import {Price} from "@/components/shared/price";
import {Button} from "@/components/ui";
import {Plus} from "lucide-react";
import {Product} from "@/interfaces/product";

type Props = Omit<Product, "variants"> & { className?: string }

export const ProductCard: FC<Props> = ({ id, name, price, imageUrl, className, description }): ReactElement => {
  return (
    <figure className={cn('max-w-[285px] w-full', className)}>
      <Link href={`/product/${ id }`}
            className='w-full h-[260px] rounded-xl bg-secondary flex items-center justify-center p-6'>
        {
          imageUrl &&
          <Image src={imageUrl}
                 alt={name}
                 width={292}
                 height={292}/>
        }
      </Link>
      <figcaption>
        <Title text={ name } size="sm" className="mt-3.5 mb-1.5 font-bold" />
        <p className="text-gray-500 text-sm mb-3.5 h-[60px] line-clamp-3 overflow-hidden">{ description }</p>
        <div className="flex items-center justify-between">
          <span><Price value={ price } /></span>
          <Link href={`/product/${ id }`}>
            <Button variant="secondary" className="text-base font-bold flex items-center gap-x-1.5" size="lg">
              <Plus size={ 20 } /> Добавить
            </Button>
          </Link>
        </div>
      </figcaption>
    </figure>
  )
}