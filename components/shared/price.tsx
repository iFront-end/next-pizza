'use client'

import {FC, ReactElement} from 'react'
import {cn} from "@/lib/utils";

type Props = {
  value: number
  className?: string
}

export const Price: FC<Props> = ({ value, className }): ReactElement => {
  return <span className={ cn(className) }>
    {
      new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: 'RUB',
        notation: "standard",
        compactDisplay: "short",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    }
  </span>
}