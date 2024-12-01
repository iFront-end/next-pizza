'use client'

import React, {FC, PropsWithChildren, ReactElement} from 'react'
import {cn} from "@/lib/utils";
import {Dialog} from "@/components/ui";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {useRouter} from "next/navigation";
import {ProductExtended} from "@/@types/prisma";

interface Props {
  product: ProductExtended
  className?: string
}

export const Modal: FC<PropsWithChildren<Props>> = ({ product, className, children }): ReactElement => {
  const router = useRouter()

  return (
    <Dialog modal={ true } open={ Boolean(product) } onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-full max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        { children }
      </DialogContent>
    </Dialog>
  )
}
