let USER_INFOR = "USER_INFOR";

export let userInforLocal = {
  // set lưu xuống
  set: (userData, data) => {
    let json = JSON.stringify(userData, data);
    localStorage.setItem(USER_INFOR, json);
  },
  get: () => {
    let json = localStorage.getItem(USER_INFOR);

    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  },
  remove: () => {
    localStorage.removeItem(USER_INFOR);
  },
};
