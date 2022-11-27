import {
  CATEGORIES_ACTION_TYPES,
  Category
} from './categories.types';
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher
} from '../../utils/reducer/reducer.utils';

export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

export function _setCategories(categories: unknown) {
  return createAction(
    CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
    categories
  );
}

function _fetchCategoriesStart(): FetchCategoriesStart {
  return createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
  );
}

function _fetchCategoriesSuccess(
  categories: Category[]
): FetchCategoriesSuccess {
  return createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categories
  );
}

function _fetchCategoriesFailed(
  error: Error
): FetchCategoriesFailed {
  return createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    error
  );
}

export const setCategories = withMatcher(_setCategories);
export const fetchCategoriesStart = withMatcher(
  _fetchCategoriesStart
);
export const fetchCategoriesSuccess = withMatcher(
  _fetchCategoriesSuccess
);
export const fetchCategoriesFailed = withMatcher(
  _fetchCategoriesFailed
);
