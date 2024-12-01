'use client'

import {FC, ReactElement, useEffect, useState} from "react";
import {cn} from "@/lib/utils";

type Variant = {
  name: string
  value: number
  disabled?: boolean
}

type Props = {
  items: Variant[]
  value?: number
  onVariantSelect?: (value: number) => void
  className?: string
}

export const VariantTaps: FC<Props> = ({ items, value, onVariantSelect, className }): ReactElement => {
  const [activeTap, setActiveTap] = useState<number>(0)

  useEffect(() => {
    const variant = items.find(item => item.value === value)
    if (!variant) {
      return
    }
    setActiveTap(items.indexOf(variant))
  }, [value]);

  const onTapSelect = (tap: Variant, i: number) => {
    onVariantSelect?.(tap.value)
    setActiveTap(i)
  }

  return (
    <div className={cn('h-10 min-h-10 p-1 rounded-full bg-gray-200/60 overflow-hidden', className)}>
      <div className="relative h-full w-full flex items-center cursor-pointer">
        { items.map((item, i) => (
          <button key={ item.name } onClick={() => onTapSelect(item, i)} type="button"
                  disabled={ item.disabled }
                  style={{
                    width: `calc(100% / ${items.length})`
                  }}
                  className={cn(
                    "w-1/3 h-full flex items-center justify-center text-md relative z-10",
                    "disabled:opacity-45 disabled:cursor-not-allowed"
                  )}>
            { item.name }
          </button>
        )) }
        <div style={{
          width: `calc(100% / ${items.length})`,
          transform: `translateX(calc(100% * ${activeTap}))`
        }} className={cn('w-1/3 rounded-full h-full bg-white transition-all duration-300 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] absolute z-0')}></div>
      </div>
    </div>
  )
}