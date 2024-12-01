import {FC, ReactElement} from "react"
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Container, Title} from "@/components/shared";
import {AccountOrder} from "@/components/shared/account-order";
import {LogoutButton} from "@/components/shared/logout-button";

const AccountPage: FC = async (): Promise<ReactElement> => {
  const cookieStore = cookies();
  const isAuth = cookieStore.get('authToken')?.value;

  if (!isAuth) {
    redirect('/not-auth')
  }

  return (
    <Container className='pt-12'>
      <div className='flex items-start justify-between'>
        <Title text='Мои заказы' size='lg' className='font-extrabold mb-12' />
        <LogoutButton />
      </div>
      <AccountOrder />
    </Container>
  )
}

export default AccountPage