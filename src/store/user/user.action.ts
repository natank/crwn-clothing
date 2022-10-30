import { USER_ACTION_TYPES } from './user.types';
export const setCurrentUser = (user: unknown) => ({
  type: USER_ACTION_TYPES.SET_CURRENT_USER,
  payload: user
});
