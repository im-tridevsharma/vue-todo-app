let user = {
  id: null,
  _token: "",
};

let token = localStorage.getItem("__token");
if (token) {
  let arr = atob(token);
  arr = arr.split("_");
  user = {
    id: arr[1],
    _token: token,
  };
}

export { user };
