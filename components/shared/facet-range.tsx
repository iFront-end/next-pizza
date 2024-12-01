'use client'

import {ChangeEvent, FC, ReactElement, useEffect, useRef, useState} from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui"
import { RangeSlider } from "@/components/shared/rage-slider"
import {usePathname, useRouter} from "next/navigation";
import {useDebounce} from "react-use";

type Props = {
  className?: string
}

type PriceRange = {
  priceFrom: number,
  priceTo: number
}

export const FacetRange: FC<Props> = ({ className }): ReactElement => {
  const router = useRouter();
  const pathname = usePathname();
  const firstUpdate = useRef(true);
  const [prices, setPrices] = useState<PriceRange>({
    priceFrom: 0,
    priceTo: 1000
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const priceFrom = urlParams.get('priceFrom');
    const priceTo = urlParams.get('priceTo');

    setPrices({
      priceFrom: priceFrom ? parseInt(priceFrom, 10) : prices.priceFrom,
      priceTo: priceTo ? parseInt(priceTo) : prices.priceTo
    })
  }, []);

  useDebounce(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const urlParams = new URLSearchParams(window.location.search)
    const current = new URLSearchParams(Array.from(urlParams.entries()));
    current.set('priceFrom', prices.priceFrom.toString())
    current.set('priceTo', prices.priceTo.toString())
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  }, 600, [prices])

  const updatePrice = (name: keyof PriceRange, e: ChangeEvent<HTMLInputElement>) => {
    setPrices({
      ...prices,
      [name]: parseInt(e.target.value || '0', 10)
    })
  }

  return (
    <div className={cn('flex flex-col gap-y-6 pr-10', className)}>
      <div className='flex items-center gap-x-6'>
        <Input type="number" placeholder="0" min={0} max={1000}
               value={prices.priceFrom}
               onChange={e => updatePrice('priceFrom', e)}/>
        <Input type="number" placeholder="1000" min={100} max={1000}
               value={prices.priceTo}
               onChange={e => updatePrice('priceTo', e)}/>
      </div>
      <RangeSlider min={0} max={1000} step={1}
                   value={[prices.priceFrom, prices.priceTo]}
                   onValueChange={([priceFrom, priceTo]) => setPrices({ priceFrom, priceTo })}/>
    </div>
  )
}