'use client'

import {FC, ReactElement, useRef, useState} from "react"
import { cn } from "@/lib/utils"
import {Input} from "@/components/ui";
import {Search} from "lucide-react";
import {useClickAway, useDebounce} from "react-use";
import {Product} from "@/interfaces/product";
import {Api} from "@/services/api-client";
import {ProductSearch} from "@/components/shared/product-search";

interface Props {
  className?: string
}

export const SearchInput: FC<Props> = ({ className }): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([]);
  const [focused, setFocused] = useState<boolean>(false)
  const ref = useRef(null)

  useClickAway(ref, () => {
    setFocused(false)
  })

  useDebounce(async () => {
    if (!searchQuery) {
      return;
    }
    try {
      const response = await Api.SearchService.GET(searchQuery)
      setProducts(response)
    } catch (error) {
      console.error(error)
    }
  }, 600, [searchQuery]);

  const onProductClick = () => {
    setFocused(false)
    setSearchQuery('')
    setProducts([])
  }

  return (
    <>
      {
        focused &&
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-20"></div>
      }
      <div ref={ref} className={cn('flex items-center flex-grow relative z-20', className)}>
        <Search size={18} className="absolute left-3 text-gray-400"/>
        <Input type="text" placeholder="Поиск пиццы..."
               onFocus={() => setFocused(true)}
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="outline-none flex-grow bg-gray-100 pl-11 border-none"/>
        {
          searchQuery && products?.length &&
          <div
            className={cn('absolute top-14 w-full py-2 rounded-xl bg-white shadow-md transition-all duration-200 invisible opacity-0 z-20',
              focused && 'visible opacity-100 top-12')}>
            {
              products?.map(product => (
                <ProductSearch key={product.id} product={product} onClick={onProductClick} />
              ))
            }
          </div>
        }
      </div>
    </>
  )
}