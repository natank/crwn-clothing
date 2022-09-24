import {createContext, ReactNode, useState } from 'react';

import PRODUCTS from '../shop-data.json'

const initialProductsContext = {
  products: []
}
export const ProductsContext = createContext<PRODUCT_CONTEXT_TYPE>(initialProductsContext);

export function ProductsProvider({children}: {children: ReactNode}) {
  const [products, setProducts] = useState(PRODUCTS);
  const value = {products};
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}