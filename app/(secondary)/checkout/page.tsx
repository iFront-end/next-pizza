'use client'

import {FC, ReactElement, useState} from "react";
import {Container, Title} from "@/components/shared";
import {CheckoutTotals} from "@/components/shared/checkout-totals";
import {useCart} from "@/hooks/useCart";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {checkoutFormSchema, CheckoutFormValues} from "@/schema/checkout-form-schema";
import {CheckoutDelivery} from "@/components/shared/checkout-delivery";
import {CheckoutContacts} from "@/components/shared/checkout-contacts";
import {CheckoutProducts} from "@/components/shared/checkout-products";
import {clearCart, createOrder} from "@/app/actions";
import {redirect, useRouter} from "next/navigation";
import {toast} from "@/hooks/use-toast";


const CheckoutPage: FC = (): ReactElement => {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const cartState = useCart()
  const router = useRouter()
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: ''
    }
  })

  if (cartState.items?.length === 0 && !cartState.loading) {
    redirect("/")
  }

  const onCartClear = async () => {
    try {
      setSubmitting(true)
      await clearCart()
      cartState.clearCart()
    } catch {
      toast({
        variant: 'destructive',
        title: 'Произошла ошибка очистки корзины',
        duration: 3000
      })
    } finally {
      setSubmitting(false)
    }
  }

  const onSubmit: SubmitHandler<CheckoutFormValues> = async data => {
    try {
      setSubmitting(true)
      const order = await createOrder(data)

      if (order) {
        const toastConfirm = toast({
          title: "Заказ оформлен",
          description: "Ожидайте курьера, скоро он к вам приедет"
        })
        setTimeout(() => {
          toastConfirm.dismiss()
          router.push('/')
        }, 4000)
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Не удалось создать заказ",
        description: "Попробуйте оформить заказ позже"
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className='pt-12'>
      <Title text='Оформление заказа' size='lg' className='font-extrabold mb-12' />
      <FormProvider {...form}>
        <form onSubmit={ form.handleSubmit(onSubmit) }>
          <div className='flex items-start gap-x-11'>
          <div className='flex flex-col gap-y-11 flex-grow'>
            <CheckoutProducts items={ cartState.items }
                              deletionIds={ cartState.deletionIds }
                              clearCart={ onCartClear }
                              removeCartItem={ cartState.removeCartItem }
                              updateItemQuantity={ cartState.updateItemQuantity } />
            <CheckoutContacts/>
            <CheckoutDelivery/>
          </div>
          <CheckoutTotals totalsAmount={cartState.totalAmount}
                          loading={ cartState.loading || submitting }
                          className='sticky top-10'/>
        </div>
        </form>
      </FormProvider>
    </Container>
  )
}

export default CheckoutPage
