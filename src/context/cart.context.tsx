import { createContext, ReactNode, useEffect, useState } from "react";

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

function decrementProduct(cartItems: CART_ITEM_TYPE[], productId: number) {
  return cartItems.reduce((acc: CART_ITEM_TYPE[], item: CART_ITEM_TYPE) => {
    item.id === productId && item.quantity--;
    if(item.quantity > 0) return [...acc, item];
    return acc;
  }, [])
}
export function CartContextProvider({children}: {children: ReactNode}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartValue, setCartValue] = useState(0);
  const [cartItems, setCartItems] = useState<CART_ITEM_TYPE[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState(initialCartContext.cartItemsCount);

  useEffect(()=>{
    setCartItemsCount(cartItems.reduce((acc, curr)=>(acc+curr.quantity), 0))
    setCartValue(cartItems.reduce((acc, curr)=>{return acc+curr.quantity*curr.price}, 0))
  },[cartItems])
  function addItemToCart(productToAdd: PRODUCT_TYPE) {
    setCartItems(addCartItem(cartItems, productToAdd))
  }
  function removeItemFromCart(productId: number) {
    setCartItems(removeCartItem(cartItems, productId))
  }
  function incrementQty(productId: number) {
    setCartItems(incrementProduct(cartItems, productId))
  }
  function decrementQty(productId: number) {
    setCartItems(decrementProduct(cartItems, productId))
  }

  return (
    <CartContext.Provider value={{
        cartItems, isCartOpen, addItemToCart, 
        removeItemFromCart, setIsCartOpen, cartItemsCount,
        incrementQty, decrementQty, cartValue
      }}>
        {children}
    </CartContext.Provider>
  )
}

