import {FC, memo, ReactElement} from 'react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/shared/container'

interface Props {
  className?: string
}

const mFooter: FC<Props> = ({ className }): ReactElement => {
  return (
    <footer className={cn('border-t py-11', className)}>
      <Container className="flex justify-center items-center">
        © Copyright 2024 Next Pizza
      </Container>
    </footer>
  )
}

export const Footer = memo(mFooter)