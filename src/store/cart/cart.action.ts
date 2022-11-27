import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher
} from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

export type ToggleCart =
  Action<CART_ACTION_TYPES.TOGGLE_CART>;

export type AddCartItem = ActionWithPayload<
  CART_ACTION_TYPES.ADD_ITEM,
  PRODUCT_TYPE
>;

export type RemoveCartItem = ActionWithPayload<
  CART_ACTION_TYPES.REMOVE_ITEM,
  number
>;

export type IncrementQty = ActionWithPayload<
  CART_ACTION_TYPES.INCREMENT_QTY,
  number
>;

export type DecrementQty = ActionWithPayload<
  CART_ACTION_TYPES.DECREMENT_QTY,
  number
>;

export function _toggleCart(): ToggleCart {
  return createAction(CART_ACTION_TYPES.TOGGLE_CART);
}

export function _addCartItem(
  productToAdd: PRODUCT_TYPE
): AddCartItem {
  return createAction(
    CART_ACTION_TYPES.ADD_ITEM,
    productToAdd
  );
}

export function _removeCartItem(
  productId: number
): RemoveCartItem {
  return createAction(
    CART_ACTION_TYPES.REMOVE_ITEM,
    productId
  );
}

export function _incrementQty(
  productId: number
): IncrementQty {
  return createAction(
    CART_ACTION_TYPES.INCREMENT_QTY,
    productId
  );
}

export function _decrementQty(
  productId: number
): DecrementQty {
  return createAction(
    CART_ACTION_TYPES.DECREMENT_QTY,
    productId
  );
}

export const toggleCart = withMatcher(_toggleCart);
export const addCartItem = withMatcher(_addCartItem);
export const removeCartItem = withMatcher(_removeCartItem);
export const incrementQty = withMatcher(_incrementQty);
export const decrementQty = withMatcher(_decrementQty);
