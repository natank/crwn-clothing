// @ts-nocheck
import { createContext, ReactNode, useEffect, useState, useReducer } from "react";
import { CartItems } from "../components/cart-dropdown/cart-dropdown.styles";

const CART_ACTIONS = {
  TOGGLE_CART: 'TOGGLE_CART',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREMENT_QTY: 'INCREMENT_QTY',
  DECREMENT_QTY: 'DECREMENT_QTY'
}

const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartValue: 0,
  cartItemsCount: 0
}

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case CART_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      }
      break;
    case CART_ACTIONS.ADD_ITEM:
    {
        const cartItems = addCartItem(state.cartItems, payload);
        const newState = {
          ...state,
          cartItems,
          cartValue: calcCartValue(cartItems),
          cartItemsCount: calcCartItemsCount(cartItems)
        }
        return newState;
        break;
    }
    case CART_ACTIONS.REMOVE_ITEM:
    {
      const cartItems = removeCartItem(state.cartItems, payload)
      return {
        ...state,
        cartItems,
        cartValue: calcCartValue(cartItems),
        cartItemsCount: calcCartItemsCount(cartItems)
      }
      break
    }
    case CART_ACTIONS.INCREMENT_QTY:
    {  
      const { cartItems } = state;
      return {
        ...state,
        cartItems: incrementProduct(cartItems, payload),
        cartValue: calcCartValue(cartItems),
        cartItemsCount: calcCartItemsCount(cartItems)
      }
      break;
    }
    case CART_ACTIONS.DECREMENT_QTY:
    {  
      const { cartItems } = state;
      return {
        ...state,
        cartItems: decrementProduct(cartItems, payload),
        cartValue: calcCartValue(cartItems),
        cartItemsCount: calcCartItemsCount(cartItems)
      }
      break;
    }
    default:
      throw `unknown action ${action}`
  }
}

const initialCartContext = {
  cartItems: [],
  isCartOpen: false,
  addItemToCart: null,
  removeItemFromCart: null,
  setIsCartOpen: null,
  cartItemsCount: 0,
  incrementQty: (id: number) => {return},
  decrementQty: (id: number) => {return},
  cartValue: 0
}

export const CartContext = createContext<CART_CONTEXT_TYPE>(initialCartContext);

function addCartItem(cartItems: CART_ITEM_TYPE[], productToAdd: PRODUCT_TYPE) {
  const newCartItemsList = [...cartItems];
  const existingCartItem = newCartItemsList.find((item)=>item.id === productToAdd.id);  
  
  if(existingCartItem) {
    existingCartItem.quantity++;
    return newCartItemsList;
  } else {
    const newCartItem = {...productToAdd, quantity: 1}
    return [...newCartItemsList, newCartItem]
  }
} 

function removeCartItem(cartItems: CART_ITEM_TYPE[], productId: number){
  return cartItems.filter((cartItem) => cartItem.id !== productId)
}

function incrementProduct(cartItems: CART_ITEM_TYPE[], productId: number) {
  return cartItems.map((item) => {
    item.id === productId && item.quantity++;
    return item;
  })
}

function calcCartValue(cartItems): number {
  return cartItems.reduce((acc, curr)=>{return acc+curr.quantity*curr.price}, 0)
}

function calcCartItemsCount(cartItems): number {
  return cartItems.reduce((acc, curr)=>(acc+curr.quantity), 0)
}

function decrementProduct(cartItems: CART_ITEM_TYPE[], productId: number) {
  return cartItems.reduce((acc: CART_ITEM_TYPE[], item: CART_ITEM_TYPE) => {
    item.id === productId && item.quantity--;
    if(item.quantity > 0) return [...acc, item];
    return acc;
  }, [])
}
export function CartContextProvider({children}: {children: ReactNode}) {
  const [ state, dispatch ] = useReducer(cartReducer, initialState);

  function addItemToCart(productToAdd: PRODUCT_TYPE) {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: productToAdd });
  }
  function removeItemFromCart(productId: number) {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  }
  function incrementQty(productId: number) {
    dispatch({ type: CART_ACTIONS.INCREMENT_QTY, payload: productId });
  }
  function decrementQty(productId: number) {
    dispatch({ type: CART_ACTIONS.DECREMENT_QTY, payload: productId });
  }

  function setIsCartOpen() {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART })
  }

  return (
    <CartContext.Provider value={{
        cartItems: state.cartItems, isCartOpen: state.isCartOpen, addItemToCart, 
        removeItemFromCart, setIsCartOpen, cartItemsCount: state.cartItemsCount,
        incrementQty, decrementQty, cartValue: state.cartValue
      }}>
        {children}
    </CartContext.Provider>
  )
}

