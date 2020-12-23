import { SET_DATA, SET_SELECTED_USER, RESET_SELECTED_USER } from "../actionTypes/ActionTypes";

export const setData = (data: any) => {
  return {
    type: SET_DATA,
    payload: data
  };
};

export const setSelectedUser = (id: any) => {
  return {
    type: SET_SELECTED_USER,
    payload: id
  };
};

export const resetSelectedUser = () => {
  return {
    type: RESET_SELECTED_USER
  };
};


