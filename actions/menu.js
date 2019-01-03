import { MENU_STATE } from './constants';

export function setMenuState() {
  return dispatch => dispatch({ type: MENU_STATE })
}
