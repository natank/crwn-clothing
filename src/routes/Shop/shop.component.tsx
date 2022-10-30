// @ts-nocheck
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectCategoriesMap,
  selectIsCategoriesAreLoading
} from '../../store/categories/categories.selector';
import { ProductsContainer } from './shop.styles';
import { Fragment } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
export default function Shop() {
  const loading = useSelector(selectIsCategoriesAreLoading);
  const categories = useSelector(selectCategoriesMap);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        Object.keys(categories).map((title) => (
          <Fragment key={title}>
            <h2>
              <Link to={title}>{title}</Link>
            </h2>
            <ProductsContainer>
              {categories[title]
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
            </ProductsContainer>
          </Fragment>
        ))
      )}
      <Outlet />
    </>
  );
}
