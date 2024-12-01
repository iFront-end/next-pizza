'use client'

import { FC, ReactElement } from 'react'
import { cn } from '@/lib/utils'
import {Button} from "@/components/ui";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

type Props = {
  className?: string
}

export const LogoutButton: FC<Props> = ({ className }): ReactElement => {
  const router = useRouter()

  const logout = () => {
    Cookies.remove('authToken', { path: '' })
    router.push('/')
  }
  
  return (
    <Button className={ cn('', className) } onClick={ logout }
            size='sm' variant='destructive'>Выйти</Button>
  )
}
