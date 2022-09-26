import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component'
import './category.styles.scss';
export default function Category() {
  const { categoriesMap } = useContext(CategoriesContext);
  const { category: title } = useParams();
  const [products, setProducts]= useState([] as PRODUCT_TYPE[]);
  
  useEffect(() => {
    title && setProducts(categoriesMap[title]);
  }, [title, categoriesMap])


  return <div className='category'>
    <h2 className='title'>{title?.toUpperCase()}</h2>
    <div className='category-container'>
    {
      products && products.map((product)=>(
                <ProductCard key={product.id} product={product} />
              ))}
    </div>
  </div>
}