'use client'

import React, {FC, InputHTMLAttributes, ReactElement} from 'react'
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui";
import {useFormContext} from "react-hook-form";
import {X} from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  label: string
  name: string
  required?: boolean
  cleanable?: boolean
  placeholder?: string
  className?: string
}

export const InputUi: FC<Props> = ({ label, name, required, cleanable, placeholder, className }): ReactElement => {
  const { register, formState: { errors }, watch, setValue } = useFormContext()

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true })
  }

  const value = watch(name)
  const errorText = errors[name]?.message as string

  return (
    <div className={ cn('relative', className) }>
      <label htmlFor={ name } className='text-sm font-bold mb-0.5 inline-flex'>
        { label }
        { required && <sup className='text-red-600 ml-1 text-sm top-0 leading-4'>*</sup> }
      </label>
      <div className='relative flex items-center'>
        <Input id={ name } placeholder={ placeholder } {...register(name)} />
        { Boolean(value?.length) && cleanable &&
          <X size={ 18 }
             onClick={ onClickClear }
             className='opacity-60 absolute right-2 cursor-pointer' />}
      </div>
      { errorText && <p className='text-red-600 absolute top-full left-0 text-xs'>{ errorText }</p> }
    </div>
  )
}
