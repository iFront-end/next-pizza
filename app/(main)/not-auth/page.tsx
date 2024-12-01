import {FC, ReactElement} from "react";
import InfoBlock from "@/components/shared/info-block";

const NotAuthPage: FC = (): ReactElement => {
  return (
    <main className="flex flex-col h-full">
      <InfoBlock title='Доступ запрещён'
                 text='Данную страницу могут просматривать только авторизованные пользователи'
                 imageUrl='access-denied.svg' />
    </main>
  )
}

export default NotAuthPage
