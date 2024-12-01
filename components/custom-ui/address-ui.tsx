import React, {FC, ReactElement} from 'react'
import {AddressSuggestions} from "react-dadata";
import 'react-dadata/dist/react-dadata.css';
import {cn} from "@/lib/utils";
import {ControllerFieldState} from "react-hook-form";

type Props = {
  label: string
  name: string
  onChange: (value?: string) => void
  state: ControllerFieldState
  required?: boolean
  className?: string
}

export const AddressUi: FC<Props> = ({ label, name, onChange, state, required, className }): ReactElement => {
  const errorText = state.error?.message as string

  return (
    <div className={cn('relative', className)}>
      <label htmlFor={name} className='text-sm font-bold mb-0.5 inline-flex'>
        {label}
        {required && <sup className='text-red-600 ml-1 text-sm top-0 leading-4'>*</sup>}
      </label>
      <AddressSuggestions uid={name} token="1f37cf6bca9d0338aef9fc9e5d7eb9bc3b2677ef"
                          onChange={data => onChange(data?.value)}/>
      { errorText && <p className='text-red-600 absolute top-full left-0 text-xs'>{ errorText }</p> }
    </div>
  )
}
