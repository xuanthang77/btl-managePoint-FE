import { userInforLocal } from "../../services/local.service";
import { SET_LOGIN } from "../constants/userConstant";

const initialState = {
  userInfor: null,
};

export let userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOGIN: {
      state.userInfor = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
