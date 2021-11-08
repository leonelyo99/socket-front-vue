export default () => ({
  token: !!localStorage.getItem("token") ? localStorage.getItem("token") : null,
  username: !!localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null,
  userId: !!localStorage.getItem("userId") ? localStorage.getItem("userId") : null
});
