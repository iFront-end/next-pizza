import { FC, ReactElement } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image";
import Link from "next/link";
import {Product} from "@/interfaces/product";

interface Props {
  product: Product
  onClick: () => void
  className?: string
}

export const ProductSearch: FC<Props> = ({ product, onClick, className }): ReactElement => {
  return (
    <Link href={`product/${product.id}`}
          onClick={onClick}
          prefetch={false}
          className={cn('flex gap-x-3 items-center py-2 px-3 hover:bg-primary/5', className)}>
      <Image src={product.imageUrl} alt={product.name} width={30} height={30} />
      {product.name}
    </Link>
  )
}