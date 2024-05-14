import { SET_LOGIN } from "../constants/userConstant";

export const setUser = (userData) => {
  return {
    type: SET_LOGIN,
    payload: userData,
  };
};
