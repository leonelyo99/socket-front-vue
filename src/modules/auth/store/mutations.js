export const loginUser = (state, { username, token, _id }) => {
    localStorage.setItem('userId', _id);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    state.username = username;
    state.token = token;
    state.userId = _id;
    state.authenticated = true;
};

export const logout = (state) => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");

  state.token = null;
  state.username = null;
  state.userId = null;
  state.authenticated = false;
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
  state.token = token;
};
