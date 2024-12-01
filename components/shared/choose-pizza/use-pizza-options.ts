import {PizzaSize, PizzaType} from "@/@constants/pizza";
import {useEffect, useMemo, useState} from "react";
import {ProductVariant} from "@prisma/client";
import {getAvailablePizzaSizes} from "@/components/shared/choose-pizza/choose-pizza.service";

type ReturnProps = {
  size: PizzaSize
  type: PizzaType
  availableSizes: { name: string, value: number, disabled?: boolean}[]
  currentItemId: number | undefined
  setSize: (size: PizzaSize) => void
  setType: (size: PizzaType) => void
}

export const usePizzaOptions = (variants: ProductVariant[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const availableSizes = useMemo(() => {
    return getAvailablePizzaSizes(type, variants)
  }, [type])

  const currentItemId = variants.find(item => item.pizzaType === type && item.size === size)?.id;

  useEffect(() => {
    const isAvailableSize = availableSizes?.find(item => item.value === size && !item.disabled);
    const availableSize = availableSizes?.find(item => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(availableSize.value as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    availableSizes,
    currentItemId,
    setSize,
    setType
  };
};