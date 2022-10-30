import { CART_ACTION_TYPES } from './cart.types';

export function toggleCart() {
  return { type: CART_ACTION_TYPES.TOGGLE_CART };
}

export function addCartItem(productToAdd: PRODUCT_TYPE) {
  return {
    type: CART_ACTION_TYPES.ADD_ITEM,
    payload: productToAdd
  };
}

export function removeCartItem(productId: number) {
  return {
    type: CART_ACTION_TYPES.REMOVE_ITEM,
    payload: productId
  };
}

export function incrementQty(productId: number) {
  return {
    type: CART_ACTION_TYPES.INCREMENT_QTY,
    payload: productId
  };
}

export function decrementQty(productId: number) {
  return {
    type: CART_ACTION_TYPES.DECREMENT_QTY,
    payload: productId
  };
}
