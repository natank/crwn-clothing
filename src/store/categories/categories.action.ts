// @ts-nocheck
import { CATEGORIES_ACTION_TYPES } from './categories.types';
import { createAction } from '../../utils/reducer/reducer.utils';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
export function setCategories(categories: unknown) {
  return createAction(
    CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
    categories
  );
}

export function fetchCategoriesStart() {
  return createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
  );
}
export function fetchCategoriesSuccess(
  categories: unknown[]
) {
  return createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categories
  );
}
export function fetchCategoriesFailed(error: string) {
  return createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    error
  );
}

export const fetchCategoriesAsync =
  () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray =
        await getCategoriesAndDocuments('categories');
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailed(error));
    }
  };
