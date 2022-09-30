import { useNavigate } from 'react-router-dom';
import {
  BackgroundImage,
  Body,
  CategoryItemContainer,
} from './category-item.styles';

const CategoryItem = ({ category }:{category: {imageUrl: string, title: string, route: string}}) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <CategoryItemContainer onClick={onNavigateHandler}>
      {/*@ts-ignore*/}
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </CategoryItemContainer>
  );
};

export default CategoryItem;