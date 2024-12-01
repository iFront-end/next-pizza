import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";
import {updateCartTotalAmount} from "@/lib/update-cart-total-amount";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10)
    const data = (await req.json()) as { quantity: number }
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ message: 'Токен корзины не найден' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id }
    })

    if (!cartItem) {
      return NextResponse.json({ message: 'Товар не найден' })
    }
    await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity }
    })
    const updatedUserCart = await updateCartTotalAmount(token)
    return NextResponse.json(updatedUserCart)
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Токен корзины не найден' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id }
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Товар не найден' });
    }

    await prisma.cartItem.delete({
      where: { id }
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 });
  }
}