import {FC, ReactElement} from "react"
import {prisma} from "@/prisma/prisma-client"
import {Modal} from "@/components/shared/modal";
import {notFound} from "next/navigation";
import {Product} from "@/components/shared/product";

type Props = {
  id: string
}

const ProductModal: FC<{ params: Props }> = async ({ params: { id } }: { params: Props }): Promise<ReactElement> => {
  const product = await prisma.product.findFirst({
    where: { id: parseInt(id) },
    include: { ingredients: true, variants: true }
  })

  if (!product) {
    return notFound()
  }

  return (
    <Modal product={ product }>
      <Product product={ product } type="modal" />
    </Modal>
  )
}

export default ProductModal