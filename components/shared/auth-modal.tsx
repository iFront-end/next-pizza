import React, {FC, PropsWithChildren, ReactElement, ReactNode} from 'react'
import {cn} from "@/lib/utils";
import {Dialog} from "@/components/ui";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import Image from "next/image";
import {AuthForm} from "@/components/shared/auth-form";

interface Props {
  children: ReactNode
  className?: string
}

export const AuthModal: FC<PropsWithChildren<Props>> = ({ children, className }): ReactElement => {
  return (
    <Dialog modal={ true }>
      <DialogTrigger asChild>{ children }</DialogTrigger>
      <DialogContent className={cn('p-11 w-full max-w-[450px] min-h-[300px] bg-white overflow-hidden', className)}>
        <DialogHeader className='relative font-nunito'>
          <DialogTitle className='font-semibold text-3xl'>Вход в аккаунт</DialogTitle>
          <DialogDescription className='max-w-[240px] w-full text-gray-600'>
            Введите логин и пароль, чтобы войти или зарегистрироваться
          </DialogDescription>
          <Image src='/phone-in-hand.svg' alt='phone'
                 className='absolute top-2.5 right-2.5'
                 width={60} height={60}
                 priority={true} quality={75}/>
        </DialogHeader>
        <AuthForm />
      </DialogContent>
    </Dialog>
)
}
