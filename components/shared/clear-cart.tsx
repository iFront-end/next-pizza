import {FC, ReactElement} from "react";
import {cn} from "@/lib/utils";
import {Trash2} from "lucide-react";

type Props = {
  onClick?: VoidFunction
  className?: string
}

export const ClearCart: FC<Props> = ({ onClick, className }): ReactElement => {
  return (
    <div className={ cn('flex items-center gap-x-2.5 text-gray-400 cursor-pointer', className) } onClick={ onClick }>
      <Trash2 size={18} />
      Очистить корзину
    </div>
  )
}