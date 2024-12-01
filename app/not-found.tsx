'use server'

import {FC, ReactElement} from "react";
import {Header} from "@/components/shared";
import InfoBlock from "@/components/shared/info-block";

const NotFoundPage: FC = (): ReactElement => {
  return (
    <main className="flex flex-col h-full">
      <Header />
      <InfoBlock title='Страница не найдена'
                 text='Проверьте корректность введённого адреса или повторите попытку позже'
                 imageUrl='404.svg' />
    </main>
  )
}

export default NotFoundPage
