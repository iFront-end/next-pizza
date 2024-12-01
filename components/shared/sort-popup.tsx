import { FC, ReactElement } from "react"
import { cn } from "@/lib/utils"
import {ArrowUpDown} from "lucide-react";

interface Props {
  className?: string
}

export const SortPopup: FC<Props> = ({ className }): ReactElement => {
  return (
    <div className={cn('inline-flex items-center rounded-xl bg-gray-50 px-5 h-[55px] gap-x-2.5 cursor-pointer', className)}>
      <ArrowUpDown size={18} />
      <span className="text-gray-900">Сортировка:</span>
      <span className="text-primary">рейтингу</span>
    </div>
  )
}