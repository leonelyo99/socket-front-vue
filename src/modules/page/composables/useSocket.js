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

  /**
   * Listen to messages from a specific room and before listening, check if there was already a previous instance to unsubscribe
   */
  const listenMessage = () => {
    if (!!subscriptionListenMessage && !!subscriptionListenMessage.connected) {
      socket.off(`message-${store.getters["page/getPrevRoom"]}`)
    }
    subscriptionListenMessage = socket.on(
      `message-${store.getters["page/getRoom"]}`,
      (resp) => {
        if (!resp.error) {
          store.dispatch("page/setReceiveMessage", resp.data);
        }
      }
    );
  };

  /**
   * listen to error for the logged in user
   */
  subscriptionListenError = socket.on(`error`, (error) => {
    Swal.fire("Error", getErrorMessage(error.data.message), "error");
    if (error && error.data.status === 401) {
      logout();
    }
  });

  /**
   * Emit the messages to the back
   */
  const newMessage = (message) => {
    socket.emit("new-message", message);
  };

  /**
   * listen to notifications for the logged in user
   */
  subscriptionListenNotification = socket.on(
    `notification-${store.getters["auth/getUserId"]}`,
    (resp) => {
      store.dispatch("page/setNewNotification", resp.data);
    }
  );

  onUnmounted(() => {
    if (!!subscriptionListenMessage && !!subscriptionListenMessage.connected) {
      subscriptionListenMessage.disconnect();
    }

    if (!!subscriptionListenError && !!subscriptionListenError.connected) {
      subscriptionListenError.disconnect();
    }

    if (!!subscriptionListenNotification && !!subscriptionListenNotification.connected) {
      subscriptionListenNotification.disconnect();
    }
  });

  return {
    newMessage,
    listenMessage,
  };
};

export default useSocket;
