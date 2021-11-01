<template>
  <div class="list-group px-3" v-if="!!contacts">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="mt-3 mb-3">Contactos</h3>
      <a @click="logout" class="link-secondary pointer">Salir</a>
    </div>
    <div v-for="(contact, index) in contacts" :key="`contact-${index}`">
      <button
        @click="() => handleSetContact(index)"
        type="button"
        :class="selectedUser._id === contact._id ? 'selected-contact' : ''"
        :disabled="selectedUser._id === contact._id"
        class="list-group-item list-group-item-action d-flex align-items-center"
      >
        {{ contact.username }}
        <div
          v-if="haveNotification(contact._id)"
          class="div-notification ms-auto"
        ></div>
      </button>
    </div>
  </div>
</template>

<script>
import useAuth from "../../../shared/composables/useAuth";
import useContacts from "../composables/useContacts";
import { useStore } from "vuex";

export default {
  setup() {
    const { logout } = useAuth();

  

    const {
      contacts,
      selectedUser,
      haveNotification,
      handleSetContact,
    } = useContacts();

    return {
      contacts,
      logout,
      selectedUser,
      haveNotification,
      handleSetContact,
    };
  },
};
</script>

<style scoped>
.div-notification {
  width: 8px;
  height: 8px;
  background-color: #0d6efd;
  border-radius: 100%;
}

.selected-contact {
  background-color: #cff4fc;
}
</style>
