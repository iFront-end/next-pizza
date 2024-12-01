'use server'

import {FC, ReactElement} from 'react'
import {cn} from '@/lib/utils'
import {AuthModal} from "@/components/shared/auth-modal";
import {Button} from "@/components/ui";
import {CircleUserRound, User} from "lucide-react";
import {cookies} from "next/headers";
import Link from "next/link";

type Props = {
  className?: string
}

export const LoginButton: FC<Props> = async ({ className }): Promise<ReactElement> => {
  const cookieStore = cookies();
  const isAuth = cookieStore.get('authToken')?.value;

  return (
    <>
      { isAuth ?
        <Link href='/account' prefetch={ false }>
          <Button variant="outline" className="gap-x-2">
            <CircleUserRound size={ 20 } /> Профиль
          </Button>
        </Link> :
        <AuthModal className={ cn('', className) }>
          <Button variant="outline" className="gap-x-2">
            <User size={18} />Войти
          </Button>
        </AuthModal>
      }
    </>
  )
}
