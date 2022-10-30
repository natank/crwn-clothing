// @ts-nocheck
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectCategoriesMap,
  selectIsCategoriesAreLoading
} from '../../store/categories/categories.selector';
import ProductCard from '../../components/product-card/product-card.component';
import {
  CategoryContainer,
  Title
} from './category.styles';
import Spinner from '../../components/spinner/spinner.component';

export default function Category() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const loading = useSelector(selectIsCategoriesAreLoading);
  const { category: title } = useParams();
  const [products, setProducts] = useState(
    [] as PRODUCT_TYPE[]
  );

  useEffect(() => {
    categoriesMap &&
      title &&
      setProducts(categoriesMap[title]);
  }, [title, categoriesMap]);

  return (
    <div className="category">
      <Title>{title?.toUpperCase()}</Title>
      {loading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
        </CategoryContainer>
      )}
    </div>
  );
}
