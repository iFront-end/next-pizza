'use client'

import React, {FC, ReactElement, useState} from 'react'
import {FormProvider, SubmitHandler, useForm} from "react-hook-form"
import {loginFormSchema, LoginFormValues} from "@/schema/login-form-schema"
import {zodResolver} from "@hookform/resolvers/zod"
import {loginUser} from "@/app/actions"
import {InputUi} from "@/components/custom-ui/input-ui"
import {Button} from "@/components/ui"
import {cn} from "@/lib/utils"
import {useRouter} from "next/navigation"


interface Props {
  className?: string
}

export const AuthForm: FC<Props> = ({ className }): ReactElement => {
  const [formError, setFormError] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      login: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async data => {
    try {
      const result = await loginUser(data)
      setFormError(!result)
      if (result) {
        router.push('/account')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={ cn('', className) }>
        { formError && <p className='text-red-600 text-xs'>Неверный логин или пароль</p>}
        <InputUi label='Логин' name='login' className='mb-4' required cleanable={ true } />
        <InputUi label='Пароль' name='password' className='mb-4' required cleanable />
        <Button loading={ form.formState.isSubmitting } className='w-full'>Войти</Button>
      </form>
    </FormProvider>
  )
}
