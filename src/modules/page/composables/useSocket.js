import { onUnmounted } from "vue";
import { useStore } from "vuex";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import getErrorMessage from "../../../shared/helpers/errors.helper";
import { SOCKET_URL } from "../../../shared/api";
import useAuth from "../../../shared/composables/useAuth";

const useSocket = () => {
  const socket = io(SOCKET_URL);
  const store = useStore();
  const { logout } = useAuth();

  let subscriptionListenMessage = null;
  let subscriptionListenError = null;
  let subscriptionListenNotification = null;

  const listenMessage = () => {
    !!subscriptionListenMessage?.connected &&
      subscriptionListenMessage.removeListener();

    subscriptionListenMessage = socket.on(
      `message-${store.getters["page/getRoom"]}`,
      (resp) => {
        if (!resp.error) {
          store.dispatch("page/setReceiveMessage", resp.data);
        }
      }
    );
  };

  subscriptionListenError = socket.on(`error`, (error) => {
    Swal.fire("Error", getErrorMessage(error.data.message), "error");
    if (error && error.data.status === 401) {
      logout();
    }
  });

  const newMessage = (message) => {
    socket.emit("new-message", message);
  };

  subscriptionListenNotification = socket.on(
    `notification-${store.getters["auth/getUserId"]}`,
    (resp) => {
      store.dispatch("page/setNewNotification", resp.data);
    }
  );

  onUnmounted(() => {
    !!subscriptionListenMessage?.connected &&
      subscriptionListenMessage.removeListener();

    !!subscriptionListenError?.connected &&
      subscriptionListenError.removeListener();

    !!subscriptionListenNotification?.connected &&
      subscriptionListenNotification.removeListener();
  });

  return {
    newMessage,
    listenMessage,
  };
};

export default useSocket;
