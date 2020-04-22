import { SAVE_PRODUCT_DETAILS } from '../actions/types';

export default function(
  state = {},
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case SAVE_PRODUCT_DETAILS:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}
