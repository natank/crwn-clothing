import { Link, Outlet } from 'react-router-dom';
import './shop.styles.scss'
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
            <div className='products-container'>
              {categoriesMap[title].slice(0,4).map((product)=>(
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Fragment>
        ))
      }
      <Outlet />
    </>
  )
}