import { MENU_STATE } from '../actions/constants';

export const menuReducer = (state = false, action = {}) => {
  switch (action.type) {
    case(MENU_STATE):
      return !state;
    default:
      return state;
  }
}