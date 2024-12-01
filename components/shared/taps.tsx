'use client'

import {FC, ReactElement} from "react";
import {cn} from "@/lib/utils";
import {useStoreTaps} from "@/store/store.taps";
import useScrollIntoView from "@/hooks/use-scroll-into-view";
import {Category} from "@prisma/client";

interface Props {
  categories: Category[],
  className?: string
}

export const Taps: FC<Props> = ({ categories, className }): ReactElement => {
  const tapActiveId = useStoreTaps(state => state.activeId)
  const scrollTo = useScrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })

  return (
    <div className={cn('inline-flex items-center rounded-xl bg-gray-50 p-1.5 gap-x-1', className)}>
      {
        categories.map(category => (
          <button key={ category.id } onClick={() => scrollTo(category.id.toString())} className={cn(
            'rounded-xl px-6 py-2.5 text-gray-900 font-medium',
            tapActiveId === category.id.toString() && 'shadow-md bg-white text-primary'
          )}>{ category.name }</button>
        ))
      }
    </div>
  )
}