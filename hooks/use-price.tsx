'use client'

import { useEffect, useState } from "react";

const usePrice = (value: number): string => {
  const [price, setPrice] = useState<string>("0");

  useEffect(() => {
    const a = new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: 'RUB',
      notation: "compact",
      compactDisplay: "short"
    }).format(value)
    setPrice(a)
  }, [value]);

  return price;
};

export default usePrice;
