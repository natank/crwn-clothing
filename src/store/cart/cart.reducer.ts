import { AnyAction } from 'redux';
import {
  addCartItem,
  decrementQty,
  incrementQty,
  removeCartItem,
  toggleCart
} from './cart.action';

export type CartState = {
  isCartOpen: boolean;
  cartItems: CART_ITEM_TYPE[];
  cartItemsCount: number;
};

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [] as CART_ITEM_TYPE[],
  cartItemsCount: 0
};

export function cartReducer(
  state = INITIAL_STATE,
  action: AnyAction
): CartState {
  if (toggleCart.match(action)) {
    return { ...state, isCartOpen: !state.isCartOpen };
  }
  if (addCartItem.match(action)) {
    const { payload } = action;
    const { cartItems } = state;
    const existingCartItem = cartItems.find(
      (item) => item.id === payload.id
    );
    if (!existingCartItem) {
      const newCartItem = {
        ...payload,
        quantity: 1
      };
      return {
        ...state,
        cartItems: [...state.cartItems, newCartItem],
        cartItemsCount: state.cartItemsCount + 1
      };
    } else {
      existingCartItem.quantity++;
      return {
        ...state,
        cartItems: [...state.cartItems],
        cartItemsCount: state.cartItemsCount + 1
      };
    }
  }
  if (removeCartItem.match(action)) {
    const { payload } = action;
    return {
      ...state,
      cartItems: state.cartItems.filter(
        (item) => item.id !== payload
      )
    };
  }

  if (incrementQty.match(action)) {
    const { payload } = action;
    return {
      ...state,
      cartItems: state.cartItems.map((item) => {
        if (item.id === payload) item.quantity++;
        return item;
      })
    };
  }

  if (decrementQty.match(action)) {
    const { payload } = action;
    return {
      ...state,
      cartItems: state.cartItems.reduce((acc, item) => {
        if (item.id === payload) {
          if (item.quantity > 1) {
            item.quantity--;
            acc.push(item);
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CART_ITEM_TYPE[])
    };
  }
  return state;
}
