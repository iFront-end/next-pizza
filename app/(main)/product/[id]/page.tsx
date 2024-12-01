import React, {FC, ReactElement} from "react";
import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container} from "@/components/shared";
import {ProductExtended} from "@/@types/prisma";
import {Product} from "@/components/shared/product";

type Props = {
  id: string
}

const ProductPage: FC<{ params: Props }> = async ({ params }: { params: Props }): Promise<ReactElement> => {
  const product = await prisma.product.findFirst({
    where: { id: parseInt(params.id, 10) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: { variants: true }
          }
        }
      },
      variants: true
    }
  }) as ProductExtended

  if (!product) {
    return notFound()
  }

  return (
    <Container>
      <Product product={ product } type="page" />
    </Container>
  )
}

export default ProductPage