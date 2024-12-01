import { FC, PropsWithChildren, ReactElement } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export const Container: FC<PropsWithChildren<Props>> = ({ className, children }): ReactElement => {
  return (
    <div className={cn('mx-auto max-w-[1312px] px-4', className)}>{ children }</div>
  )
}
