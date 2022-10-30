export function createAction(
  action: string,
  payload?: unknown
) {
  return {
    type: action,
    payload
  };
}
