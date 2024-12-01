import {FC, ReactElement, ReactNode} from "react";
import {cn} from "@/lib/utils";

type Props = {
  header: ReactNode
  endAdornment?: ReactNode
  children?: ReactNode
  action?: ReactNode
  className?: string
}

export const Panel: FC<Props> = ({ header, endAdornment, children, action, className }): ReactElement => {
  return (
    <section className={ cn('rounded-2xl bg-white', className) }>
      <header className='flex items-center justify-between border-b border-gray-50 py-7 px-8'>
        { header }
        { endAdornment }
      </header>
      { children }
      { action && <footer>{ action }</footer> }
    </section>
  )
}