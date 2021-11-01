<template>
  <div :class="loading && 'd-none'" class="d-flex flex-row">
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
      v-if="!!room && !!room.length"
    >
      <Chat />
    </div>
  </div>
  <div class="spinner-container" v-if="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from 'vuex';
import Chat from "../views/Chat.vue";
import Contacts from "../views/Contacts.vue";

export default {
  components: {
    Chat,
    Contacts,
  },
  setup() {
    const store = useStore()
    
    const seeContacts = ref(false);
    const loading = computed(()=>store.getters["page/getLoading"]);
    const room = computed(()=>store.getters["page/getRoom"])

    return {
      seeContacts,
      loading,
      room
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

  .spinner-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
