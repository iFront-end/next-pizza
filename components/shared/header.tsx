import { FC, ReactElement } from 'react'
import { Container } from '@/components/shared/container'
import { cn } from '@/lib/utils'
import {SearchInput} from "@/components/shared";
import {Logo} from "@/components/shared/logotype";
import {CartButton} from "@/components/shared/cart-button";
import {LoginButton} from "@/components/shared/login-button";

type Props = {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Header: FC<Props> = ({ hasSearch = true, hasCart = true, className }): ReactElement => {
  return (
    <header className={cn('border-b py-11', className)}>
      <Container className="flex items-center">
        <Logo />
        { hasSearch && <SearchInput className="ml-10 mr-12" /> }
        <div className="flex items-center gap-x-4 ml-auto">
          <LoginButton />
          { hasCart && <CartButton /> }
        </div>
      </Container>
    </header>
  )
}
