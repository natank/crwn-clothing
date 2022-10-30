// @ts-nocheck
import { CART_ACTION_TYPES } from './cart.types';

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemsCount: 0
};

export function cartReducer(
  state = INITIAL_STATE,
  action: { type: string; payload: Record<string, unknown> }
) {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART:
      return { ...state, isCartOpen: !state.isCartOpen };
      break;
    case CART_ACTION_TYPES.ADD_ITEM:
      {
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
      break;

    case CART_ACTION_TYPES.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== payload
        )
      };
      break;
    case CART_ACTION_TYPES.INCREMENT_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === payload) item.quantity++;
          return item;
        })
      };
    case CART_ACTION_TYPES.DECREMENT_QTY: {
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
        }, [])
      };
      break;
    }
    default:
      return state;
  }
}
