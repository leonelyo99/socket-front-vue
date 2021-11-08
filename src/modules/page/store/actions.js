import api from "../../../shared/api";
import store from "../../../store";

export const getContacts = async ({ commit }) => {
  try {
    store.dispatch("page/setLoading");
    const { error, data } = await api.get("/user/users");

    const contacts = data.filter(
      (user) => user._id !== store.getters["auth/getUserId"]
    );
    store.dispatch("page/setLoading");
    if (!error) {
      commit("contacts", contacts);
      await store.dispatch("page/setSelectedContactAndRom", 0).then(() => {
        return { ok: true };
      });
    }
  } catch (error) {
    store.dispatch("page/setLoading");
    return { ok: false };
  }
};

export const setSelectedContactAndRom = async ({ commit }, index) => {
  store.dispatch("page/setLoading");
  const selectedUser = store.getters["page/getContacts"][index];
  const values = {
    users: [{ id: selectedUser._id }, { id: store.getters["auth/getUserId"] }],
  };

  try {
    const { error, data } = await api.post("/user/messages", values);

    if (!error) {
      const notifications = store.getters["page/getNotifications"].filter(
        (userId) => userId !== selectedUser._id
      );
      commit("prevRoom", store.getters["page/getRoom"])
      commit("notifications", notifications);
      commit("room", data.room);
      commit("receiveMessageNewChat", data.messages);
      commit("selectedUser", selectedUser);
    }
    store.dispatch("page/setLoading");
    return { ok: true };
  } catch (error) {
    store.dispatch("page/setLoading");
    return { ok: false };
  }
};

export const setReceiveMessage = ({ commit }, data) => {
  commit("receiveMessage", data);
};

export const setNewNotification = ({ commit }, notification) => {
  const notifications = store.getters["page/getNotifications"];
  const selectedUser = store.getters["page/getSelectedUser"];

  selectedUser._id != notification &&
    commit("notifications", [...notifications, notification]);
};

export const setLoading = ({ commit }) => {
  commit("loading");
};
