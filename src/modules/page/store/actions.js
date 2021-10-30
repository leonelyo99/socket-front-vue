import api from "../../../shared/api";
import store from "../../../store";

export const getContacts = async ({ commit }) => {
  try {
    const { error, data } = await api.get("/user/users");

    const contacts = data.filter(
      (user) => user._id !== store.getters["auth/getUserId"]
    );
    if (!error) {
      commit("contacts", contacts);
      await store.dispatch("page/setSelectedContactAndRom", 0).then(() => {
        return { ok: true };
      });
    }
  } catch (error) {
    return { ok: false };
  }
};

export const setSelectedContactAndRom = async ({ commit }, index) => {
  console.log("setSelectedContactAndRom");
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
      commit("notifications", notifications);
      commit("room", data.room);
      commit("receiveMessageNewChat", data.messages);
      commit("selectedContact", selectedUser);
    }
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const setReceiveMessage = async ({ commit }, data) => {
  commit("receiveMessage", data);
};

export const setNewNotification = async ({ commit }, notification) => {
  const notifications = store.getters["page/getNotifications"];
  const selectedUser = store.getters["page/getSelectedContact"];

  selectedUser._id != notification &&
    commit("notifications", [...notifications, notification]);
};
