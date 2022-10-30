// @ts-nocheck
import {
  createContext,
  ReactNode,
  useReducer
} from 'react';

const CART_ACTIONS = {
  TOGGLE_CART: 'TOGGLE_CART',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREMENT_QTY: 'INCREMENT_QTY',
  DECREMENT_QTY: 'DECREMENT_QTY'
};

const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartValue: 0,
  cartItemsCount: 0
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTIONS.TOGGLE_CART:
    case CART_ACTIONS.ADD_ITEM:
    case CART_ACTIONS.REMOVE_ITEM:
    case CART_ACTIONS.INCREMENT_QTY:
    case CART_ACTIONS.DECREMENT_QTY: {
      return {
        ...state,
        ...payload
      };
      break;
    }
    default:
      throw `unknown action ${action}`;
  }
};

const initialCartContext = {
  cartItems: [],
  isCartOpen: false,
  addItemToCart: null,
  removeItemFromCart: null,
  setIsCartOpen: null,
  cartItemsCount: 0,
  incrementQty: (id: number) => {
    return;
  },
  decrementQty: (id: number) => {
    return;
  },
  cartValue: 0
};

export const CartContext = createContext<CART_CONTEXT_TYPE>(
  initialCartContext
);

function addCartItem(
  cartItems: CART_ITEM_TYPE[],
  productToAdd: PRODUCT_TYPE
) {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  const payload = {};
  if (existingCartItem) {
    existingCartItem.quantity++;
    payload.cartItems = [...cartItems];
  } else {
    const newCartItem = { ...productToAdd, quantity: 1 };
    payload.cartItems = [...cartItems, newCartItem];
  }
  (payload.cartValue = calcCartValue(payload.cartItems)),
    (payload.cartItemsCount = calcCartItemsCount(
      payload.cartItems
    ));
  return payload;
}

function removeCartItem(
  cartItems: CART_ITEM_TYPE[],
  productId: number
) {
  const payload = {};
  payload.cartItems = cartItems.filter(
    (cartItem) => cartItem.id !== productId
  );
  (payload.cartValue = calcCartValue(payload.cartItems)),
    (payload.cartItemsCount = calcCartItemsCount(
      payload.cartItems
    ));
  return payload;
}

function incrementProduct(
  cartItems: CART_ITEM_TYPE[],
  productId: number
) {
  const payload = {};
  payload.cartItems = cartItems.map((item) => {
    item.id === productId && item.quantity++;
    return item;
  });
  payload.cartValue = calcCartValue(payload.cartItems);
  payload.cartItemsCount = calcCartItemsCount(
    payload.cartItems
  );
  return payload;
}

function decrementProduct(
  cartItems: CART_ITEM_TYPE[],
  productId: number
) {
  const payload = {};
  payload.cartItems = cartItems.reduce(
    (acc: CART_ITEM_TYPE[], item: CART_ITEM_TYPE) => {
      item.id === productId && item.quantity--;
      if (item.quantity > 0) return [...acc, item];
      return acc;
    },
    []
  );
  payload.cartValue = calcCartValue(payload.cartItems);
  payload.cartItemsCount = calcCartItemsCount(
    payload.cartItems
  );
  return payload;
}

function calcCartValue(cartItems): number {
  return cartItems.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);
}

function calcCartItemsCount(cartItems): number {
  return cartItems.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
}

function toggleIsCartOpen(isCartOpen) {
  return { isCartOpen: !isCartOpen };
}
export function CartContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  function addItemToCart(productToAdd: PRODUCT_TYPE) {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: addCartItem(state.cartItems, productToAdd)
    });
  }
  function removeItemFromCart(productId: number) {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: removeCartItem(state.cartItems, productId)
    });
  }
  function incrementQty(productId: number) {
    dispatch({
      type: CART_ACTIONS.INCREMENT_QTY,
      payload: incrementProduct(state.cartItems, productId)
    });
  }
  function decrementQty(productId: number) {
    dispatch({
      type: CART_ACTIONS.DECREMENT_QTY,
      payload: decrementProduct(state.cartItems, productId)
    });
  }

  function setIsCartOpen() {
    dispatch({
      type: CART_ACTIONS.TOGGLE_CART,
      payload: toggleIsCartOpen(state.isCartOpen)
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        isCartOpen: state.isCartOpen,
        cartItemsCount: state.cartItemsCount,
        cartValue: state.cartValue,
        addItemToCart,
        removeItemFromCart,
        setIsCartOpen,
        incrementQty,
        decrementQty
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
