<template>
  <div class="d-flex flex-row">
    <div
      class="div-float-button d-block d-md-none"
      @click="seeContacts = !seeContacts"
    >
      <img
        v-if="!seeContacts"
        src="@/assets/icons/messages.svg"
        class="figure-img img-fluid"
      />
      <img
        v-if="seeContacts"
        src="@/assets/icons/friends.svg"
        class="figure-img img-fluid"
      />
    </div>
    <div
      :class="!seeContacts ? 'd-block' : 'd-none d-md-block'"
      class="col-12 col-md-4 border-end"
    >
      <Contacts />
    </div>
    <div
      :class="seeContacts ? 'd-block' : 'd-none d-md-block'"
      class="col-12 col-md-8"
      v-if="!!$store.state.page.room && !!$store.state.page.room.length"
    >
      <Chat />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Chat from "../views/Chat.vue";
import Contacts from "../views/Contacts.vue";

export default {

  components: {
    Chat,
    Contacts,
  },
  setup() {
    const seeContacts = ref(false);

    return {
      seeContacts,
    };
  },
};
</script>

<style scoped>
.div-float-button {
  width: 50px;
  height: 50px;
  position: fixed;
  z-index: 100;
  bottom: 50px;
  right: 24px;
  cursor: pointer;
  filter: invert(30%);
}
</style>
