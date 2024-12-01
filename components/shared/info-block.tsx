import React, { FC, ReactElement } from "react";
import {Title} from "@/components/shared";
import Image from "next/image";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";

type Props = {
  title: string
  text: string
  imageUrl: string
  className?: string
}

const InfoBlock: FC<Props> = ({ title, text, imageUrl, className }): ReactElement => {
  return (
    <main className={ cn('flex flex-col h-full', className) }>
      <div className="flex flex-grow items-center justify-center gap-x-16">
        <div className="max-w-[445px]">
          <Title text={ title } size={"xl"} className="font-extrabold"/>
          <p className="mt-2.5 text-xl text-gray-400">{ text }</p>
          <div className="mt-[45px] flex items-center gap-x-5">
            <Link href="/" prefetch={true}
                  className="flex items-center gap-x-2 border border-primary rounded-xl px-5 py-3 text-primary font-bold">
              <ArrowLeft size={18} />На главную
            </Link>
          </div>
        </div>
        <Image src={'/' + imageUrl}
               alt="page access denied"
               width={320} height={379}
               priority />
      </div>
    </main>
  )
}

export default InfoBlock
