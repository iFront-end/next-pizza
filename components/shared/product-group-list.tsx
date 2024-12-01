'use client'

import {FC, PropsWithChildren, ReactElement, useEffect, useRef} from 'react'
import { cn } from '@/lib/utils'
import {useIntersection} from "react-use";
import {useStoreTaps} from "@/store/store.taps";

interface Props {
  categoryId: string
  className?: string
}

export const ProductGroupList: FC<PropsWithChildren<Props>> = ({ className, categoryId, children }): ReactElement => {
  const setActiveTapId = useStoreTaps((state) => state.setActiveId)
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 1,
    rootMargin: '-300px'
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveTapId(categoryId)
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={cn('', className)}>
      <div className='scroll-mt-28' ref={ intersectionRef } id={ categoryId }></div>
      { children }
    </div>
  )
}