import {Cart, CartItem, Ingredient, Product, ProductVariant} from "@prisma/client";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

export interface CheckoutState {
  items: CartStateItem[];
  totalAmount: number;
}

export type CartItemDTO = CartItem & {
  productVariant: ProductVariant & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  cartItem: CartItemDTO[];
}

export interface CreateCartItemValues {
  productVariantId: number;
  ingredients?: number[];
}

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

  return (ingredientsPrice + item.productVariant.price) * item.quantity;
};

export const getCartDetails = (data: CartDTO): CheckoutState => {
  const items = data?.cartItem?.map(item => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariant.product.name,
    imageUrl: item.productVariant.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productVariant.size,
    pizzaType: item.productVariant.pizzaType,
    disabled: false,
    ingredients: item.ingredients.map(ingredient => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) || [] as CartStateItem[];

  return {
    items,
    totalAmount: data?.totalAmount || 0,
  };
};