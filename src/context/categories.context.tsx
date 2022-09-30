import {createContext, ReactNode, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext<CATEGORIES_CONTEXT_TYPE>({
  categoriesMap: {}
});

export function CategoriesProvider({children}: {children: ReactNode}) {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(()=>{
    const getCagtegoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    }
    getCagtegoriesMap();
  },[])
  const value = {categoriesMap};
  
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}