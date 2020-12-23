import { SET_DATA, SET_SELECTED_USER, RESET_SELECTED_USER } from "../actionTypes/ActionTypes";

const INITIAL_STATE = {
  data: [],
  selectedUser: 0
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
      case SET_DATA:
        return {
          ...state,
          data: action.payload,
      };
      case SET_SELECTED_USER:
        return {
          ...state,
          selectedUser: action.payload,
      };
      case RESET_SELECTED_USER:
        return {
          ...state,
          selectedUser: 0,
        };

    default:
      return state;
  }
};

export default reducer;
