import React, {FC, ReactElement} from "react";
import {Panel} from "@/components/shared/panel";
import {Title} from "@/components/shared/title";
import {cn} from "@/lib/utils";
import {AddressUi} from "@/components/custom-ui/address-ui";
import {Controller, useFormContext} from "react-hook-form";
import {TextareaUi} from "@/components/custom-ui/textarea-ui";

type Props = {
  className?: string
}

export const CheckoutDelivery: FC<Props> = ({ className }): ReactElement => {
  const { control } = useFormContext()

  return (
    <Panel className={cn('', className)} header={
      <Title text='3. Адрес доставки' size='md' className='font-bold'/>
    }>
      <div className='p-8'>
        <Controller render={({field, fieldState}) => (
          <AddressUi onChange={field.onChange} label='Введите адрес' name='address' state={fieldState}/>
        )} control={control} name='address'/>
        <TextareaUi name='comment' label='Комментарий к заказу' className='mt-6'/>
      </div>
    </Panel>
  )
}