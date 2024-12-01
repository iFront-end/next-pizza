'use client'

import {ChangeEvent, FC, ReactElement, useEffect, useState} from "react"
import { cn } from "@/lib/utils"
import { FacetCheckbox, Title } from "@/components/shared"
import { FilterCheckboxProps } from "@/components/shared/facet-checkbox"
import { Input } from "@/components/ui"
import {useSet} from "react-use";
import {usePathname, useRouter} from "next/navigation";

interface Props {
  items: FilterCheckboxProps[],
  name: string
  limit?: number
  title?: string
  searchPlaceholder?: string;
  defaultValue?: string[]
  className?: string
}

export const FacetsGroup: FC<Props> = ({ items, name, limit, title, searchPlaceholder, className }): ReactElement => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const [set, { add, toggle }] = useSet(new Set<string>([]))

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const query = urlParams.get(name);
    if (!query) {
      return
    }

    query.split(",").forEach(value => add(value))
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    // const current = new URLSearchParams(Array.from(urlParams.entries()));
    if (set.size === 0) {
      urlParams.delete(name)
    } else {
      urlParams.set(name, Array.from(set).toString())
    }
    const search = urlParams.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`, { scroll: false });
    router.refresh()
  }, [set]);

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