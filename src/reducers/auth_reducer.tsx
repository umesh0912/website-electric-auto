import { AUTH_ERROR, AUTH_USER, LOGOUT_USER } from '../actions/types';

export default function (
  state = {
    authenticated: false,
  },
  action: any
) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case LOGOUT_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
}
