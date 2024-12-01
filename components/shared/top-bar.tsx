import {FC, ReactElement} from "react"
import { cn } from "@/lib/utils"
import { Taps } from "@/components/shared/taps"
import { Container } from "@/components/shared/container"
import {prisma} from "@/prisma/prisma-client";

interface Props {
  className?: string
}

export const TopBar: FC<Props> = async ({ className }): Promise<ReactElement> => {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variants: true
        }
      }
    }
  })

  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between">
        <Taps categories={ categories.filter(category => category.products?.length > 0) }/>
      </Container>
    </div>
  )
}