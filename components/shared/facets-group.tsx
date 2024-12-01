'use client'

import {ChangeEvent, FC, ReactElement, useState} from "react"
import { cn } from "@/lib/utils"
import { FacetCheckbox, Title } from "@/components/shared"
import { FilterCheckboxProps } from "@/components/shared/facet-checkbox"
import { Input } from "@/components/ui"
import {useSet} from "react-use";

interface Props {
  items: FilterCheckboxProps[],
  name: string
  limit?: number
  title?: string
  searchPlaceholder?: string;
  defaultValue?: string[]
  className?: string
}

export const FacetsGroup: FC<Props> = ({ items, limit, title, searchPlaceholder, className }): ReactElement => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState('')
  const [set, { toggle }] = useSet(new Set<string>([]))

  const facets = () => {
    if (!limit || showAll) {
      return items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    }
    return items.slice(0, limit)
  }

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={cn('', className)}>
      { title && <Title text={title} size="xs" className='font-bold mb-3.5'/> }
      { searchPlaceholder && showAll &&
        <Input onChange={onChangeSearchInput}
               placeholder={searchPlaceholder} className='mb-5 bg-gray-50 border-none'/>
      }
      <div className="flex flex-col gap-y-4 max-h-60 overflow-y-auto scrollbar">
        { facets().map(item => (
            <FacetCheckbox key={item.value} text={item.text} value={item.value}
                           onCheckedChange={() => toggle(item.value)} checked={set.has(item.value)}/>
          ))
        }
      </div>
      { limit && limit < items.length &&
        <div className="text-primary mt-5 cursor-pointer" onClick={() => setShowAll(!showAll)}>
          { !showAll ? '+ Показать всё' : 'Скрыть' }
        </div>
      }
    </div>
  )
}