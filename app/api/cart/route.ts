import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";
import {findOrCreateCart} from "@/lib/find-or-create-cart";
import {CreateCartItemValues} from "@/lib/get-cart-details";
import {updateCartTotalAmount} from "@/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] })
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }]
      },
      include: {
        cartItem: {
          orderBy: { createdAt: 'desc' },
          include: {
            productVariant: {
              include: { product: true }
            },
            ingredients: true
          }
        }
      }
    })
    return NextResponse.json(userCart)
  } catch(error) {
    console.log(error);
  }
}

interface cartItemFind {
  cartId: number,
  productVariantId: number,
  ingredients: {
    every: {
      id: { in: number[] | undefined }
    },
    some?: object
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);
    const data = (await req.json()) as CreateCartItemValues;
    const ingredients = data.ingredients?.length

    const fetchVariant: cartItemFind = {
      cartId: userCart.id,
      productVariantId: data.productVariantId,
      ingredients: {
        every: {
          id: { in: data.ingredients }
        }
      },
    }

    if (ingredients) {
      fetchVariant.ingredients.some = {}
    }

    const findCartItem = await prisma.cartItem.findFirst({
      where: fetchVariant
    });

    // Если товар был найден, делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: data.productVariantId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) || [] },
        },
      });
    }
    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}