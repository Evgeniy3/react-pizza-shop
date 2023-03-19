import { CartItem } from "../redux/slices/cartSlice/types";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};