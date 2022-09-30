import { Link, Outlet } from 'react-router-dom';
import { ProductsContainer } from './shop.styles'
import { Fragment, useContext } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

export default function Shop() {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <>
      {
        Object.keys(categoriesMap).map(title  => (
          <Fragment key={title}>
              <h2>
                <Link to={title}>{title}</Link>
              </h2>
            <ProductsContainer>
              {categoriesMap[title].slice(0,4).map((product)=>(
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductsContainer>
          </Fragment>
        ))
      }
      <Outlet />
    </>
  )
}