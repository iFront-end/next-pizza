import {create} from "zustand";
import {Api} from "@/services/api-client";
import {CartStateItem, CreateCartItemValues, getCartDetails} from "@/lib/get-cart-details";
import {toast} from "@/hooks/use-toast";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  deletionIds: Set<number>;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  clearCart: () => void;
  removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>()(set => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,
  deletionIds: new Set<number>(),

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.CartService.GET();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.CartService.PATCH(id, quantity);
      set(getCartDetails(data));
      /*const t = toast({
        title: "",
        description: "",
      })
      setTimeout(() => t.dismiss(), 4000)*/
    } catch (error) {
      console.error(error);
      set({ error: true });
      const t = toast({
        variant: "destructive",
        title: "Ошибка изменения количества товара"
      })
      setTimeout(() => t.dismiss(), 4000)
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        deletionIds: state.deletionIds.add(id),
        // items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
      }));
      const data = await Api.CartService.DELETE(id);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        deletionIds: state.deletionIds.add(id),
        // items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.CartService.POST(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  clearCart: () => {
    try {
      set({ loading: true, error: false });
      set((state) => ({
        items: state.items = [],
      }));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  }
}))
