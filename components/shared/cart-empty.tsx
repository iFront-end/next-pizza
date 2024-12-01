import {FC, PropsWithChildren, ReactElement} from "react"
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Title} from "@/components/shared/title";

type Props = {
  className?: string
}

export const CartEmpty: FC<PropsWithChildren<Props>> = ({ className, children }): ReactElement => {
  return (
    <div className={cn('flex flex-col justify-center items-center', className)}>
      <Image src='/box.svg' alt="cart empty" width={ 120 } height={ 120 } className='mb-5' />
      <Title text="Корзина пустая" size="sm" className="font-semibold mb-1" />
      <p className="text-gray-400 max-w-[285px] text-center">Добавьте хотя бы одну пиццу, чтобы совершить заказ</p>
      { children }
    </div>
  )
}