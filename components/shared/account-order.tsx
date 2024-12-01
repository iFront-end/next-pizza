'use client'

import {FC, ReactElement, useState} from 'react'
import {cn} from "@/lib/utils";
import {ChevronDown} from "lucide-react";
import {CartItem} from "@/components/shared/cart-item";
import {Panel} from "@/components/shared/panel";
import {Price} from "@/components/shared/price";

type Props = {
  className?: string
}

export const AccountOrder: FC<Props> = ({ className }): ReactElement => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [toggle2, setToggle2] = useState<boolean>(false)

  return (
    <div className='flex flex-col gap-y-8'>
      <Panel header={
        <div className='flex items-center w-full gap-x-5'>
          <span className='font-bold text-2xl'>Заказ #15</span>
          <span className='text-base font-normal text-gray-400'>16 февраля 2024, в 20:31</span>
        </div>
      } endAdornment={
        <div className='flex items-center gap-x-4'>
          <div className='text-sm font-semibold text-green-600 px-4 py-2 bg-green-50 rounded-full'>Оплачено</div>
          <ChevronDown size={ 22 } className={ cn('opacity-60 cursor-pointer transition-all duration-300', {'rotate-180': toggle}) }
                       onClick={() => setToggle(state => !state)} />
        </div>
      } action={
        <div className='px-8 py-7 border-t border-gray-50 text-xl'>
          Итого: <span className='font-extrabold'><Price value={ 1240 } /></span>
        </div>
      } className={ cn('w-[650px]', className) }>
        <div className={ cn(
          'overflow-hidden transition-all duration-300 grid grid-rows-[0fr] px-8',
          {'grid-rows-[1fr] py-8': toggle}
        ) }>
          <div className='min-h-0 flex flex-col gap-y-8'>
            <CartItem imageUrl='https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp'
                      name='Сырная'
                      price={ 563 }
                      quantity={ 1 }
                      details='Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо'
                      compact={ true }
                      inline={ true } />
            <CartItem imageUrl='https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp'
                      name='Кофе Латте'
                      price={ 416 }
                      quantity={ 1 }
                      details=''
                      compact={ true }
                      inline={ true } />
            <CartItem imageUrl='https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp'
                      name='Куриные наггетсы'
                      price={ 261 }
                      quantity={ 1 }
                      details=''
                      compact={ true }
                      inline={ true } />
          </div>
        </div>
      </Panel>
      <Panel header={
        <div className='flex items-center w-full gap-x-5'>
          <span className='font-bold text-2xl'>Заказ #14</span>
          <span className='text-base font-normal text-gray-400'>13 февраля 2024, в 14:17</span>
        </div>
      } endAdornment={
        <div className='flex items-center gap-x-4'>
          <div className='text-sm font-semibold text-red-600 px-4 py-2 bg-red-50 rounded-full'>Отменен</div>
          <ChevronDown size={ 22 } className={ cn('opacity-60 cursor-pointer transition-all duration-300', {'rotate-180': toggle2}) }
                       onClick={() => setToggle2(state => !state)} />
        </div>
      } action={
        <div className='px-8 py-7 border-t border-gray-50 text-xl'>
          Итого: <span className='font-extrabold'><Price value={ 1198 } /></span>
        </div>
      } className={ cn('w-[650px]', className) }>
        <div className={ cn(
          'overflow-hidden transition-all duration-300 grid grid-rows-[0fr] px-8',
          {'grid-rows-[1fr] py-8': toggle2}
        ) }>
          <div className='min-h-0 flex flex-col gap-y-8'>
            <CartItem imageUrl='https://media.dodostatic.net/image/r:584x584/11EE7D61095E56E6BBC9D410F89DF983.jpg'
                      name='Мясная'
                      price={ 599 }
                      quantity={ 2 }
                      details='Цыпленок, ветчина, пикантная пепперони, острые колбаски чоризо, моцарелла, фирменный томатный соус'
                      compact={ true }
                      inline={ true } />
          </div>
        </div>
      </Panel>
    </div>
  )
}
