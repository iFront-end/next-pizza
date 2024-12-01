import {FC, ReactElement} from "react";
import Image from "next/image";
import {cn} from "@/lib/utils";

type Props = {
  imageUrl: string
  size: 20 | 30 | 40
  className?: string
}

export const PizzaImage: FC<Props> = ({ imageUrl, size, className }): ReactElement => {
  return (
    <div className={cn('flex items-center justify-center relative', className)}>
      <div className="border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px] flex items-center justify-center">
        <div className="border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px] flex items-center justify-center">
          <Image src={ imageUrl } alt="pizza"
                 width={ 0 } height={ 0 }
                 sizes="100vw"
                 className={cn('transition-all duration-300 mt-[4%] ml-[4%] absolute', {
                   'w-[300px] h-[300px]': size === 20,
                   'w-[400px] h-[400px]': size === 30,
                   'w-[500px] h-[500px]': size === 40
                 })} />
        </div>
      </div>
    </div>
  )
}