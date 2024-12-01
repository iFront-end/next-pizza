import {FC, ReactElement} from "react";
import {Panel} from "@/components/shared/panel";
import {Title} from "@/components/shared/title";
import {InputUi} from "@/components/custom-ui/input-ui";
import {cn} from "@/lib/utils";

type Props = {
  className?: string
}

export const CheckoutContacts: FC<Props> = ({ className }): ReactElement => {
  return (
    <Panel className={ cn('', className) } header={
      <Title text='2. Персональная информация' size='md' className='font-bold' />
    }>
      <div className='grid grid-cols-2 gap-x-7 gap-y-11 p-8'>
        <InputUi label='Имя' name='firstName' required={ true } />
        <InputUi label='Фамилия' name='lastName' />
        <InputUi label='E-Mail' name='email' cleanable={ true } />
        <InputUi label='Телефон' name='phone' />
      </div>
    </Panel>
  )
}