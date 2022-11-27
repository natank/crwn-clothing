import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartState } from './cart.reducer';
export const selectCartReducer = (
  state: RootState
): CartState => {
  return state.cart;
};

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => {
    return cart.cartItems;
  }
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => {
    return cart.isCartOpen;
  }
);

export const selectCartValue = createSelector(
  [selectCartReducer],
  (cart) => {
    return cart.cartItems.reduce((acc, item) => {
      const value = item.quantity * item.price;
      return acc + value;
    }, 0);
  }
);

export const selectCartItemsCount = createSelector(
  [selectCartReducer],
  (cart) => {
    return cart.cartItemsCount;
  }
);
