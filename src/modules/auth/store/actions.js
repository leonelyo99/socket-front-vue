import api from "../../../shared/api";

export const signup = async ({ commit }, user) => {
  try {
    const { data } = await api.post("/auth/signup", user);
    const { username, token, _id } = data;

    commit("loginUser", { username, token, _id });
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const login = async ({ commit }, user) => {
  try {
    const { data } = await api.post("/auth/login", { ...user });
    const { username, token, _id } = data;

    commit("loginUser", { username, token, _id });
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const logout = ({ commit }) => {
  commit("logout");
};
