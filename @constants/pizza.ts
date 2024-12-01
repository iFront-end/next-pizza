export const PizzaSizeMap = {
  20: 'Маленькая',
  30: 'Средняя',
  40: 'Большая',
} as const;

export const PizzaTypeMap = {
  1: 'традиционная',
  2: 'тонкая',
} as const;

export const pizzaSizes = Object.entries(PizzaSizeMap).map(([value, name]) => ({ name, value: parseInt(value, 10) }));
export const pizzaTypes = Object.entries(PizzaTypeMap).map(([value, name]) => ({ name, value: parseInt(value, 10) }));

export type PizzaSize = keyof typeof PizzaSizeMap;
export type PizzaType = keyof typeof PizzaTypeMap;