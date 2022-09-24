type PRODUCT_TYPE = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

type CART_ITEM_TYPE = PRODUCT_TYPE & { quantity: number };

type PRODUCT_CONTEXT_TYPE = {
  products: PRODUCT_TYPE[];
};

type CART_CONTEXT_TYPE = {
  cartItems: CART_ITEM_TYPE[];
  isCartOpen: boolean;
  addItemToCart: React.Dispatch<
    SetStateAction<CART_ITEM_TYPE[]>
  > | null;
  removeItemFromCart: React.Dispatch<
    SetStateAction<CART_ITEM_TYPE[]>
  > | null;
  setIsCartOpen: React.Dispatch<
    React.SetStateAction<boolean>
  > | null;
  incrementQty: (number) => void;
  decrementQty: (number) => void;
  cartItemsCount: number;
  cartValue: number;
};
