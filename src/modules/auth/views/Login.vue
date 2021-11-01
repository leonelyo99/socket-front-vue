<template>
  <form
    class="col-12 col-sm-10 col-md-8 col-lg-5 card shadow p-4"
    @submit.prevent="onSubmit"
  >
    <h2 class="text-center">Bienvenido</h2>
    <div class="col-12 mx-auto mt-4">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          v-model.trim="loginForm.username"
          required
          minlength="3"
        />
      </div>
      <div class="input-group mt-4">
        <input
          :type="seePassword ? 'text' : 'password'"
          class="form-control"
          placeholder="Password"
          aria-label="Password"
          v-model.trim="loginForm.password"
          required
          minlength="4"
        />
        <div class="input-group-append" @click="seePassword = !seePassword">
          <span class="img-see input-group-text">
            <img
              v-if="!seePassword"
              src="@/assets/icons/see.svg"
              class="figure-img img-fluid see-img"
            />
            <img
              v-if="seePassword"
              src="@/assets/icons/not-see.svg"
              class="figure-img img-fluid see-img"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="col-12 d-flex justify-content-center mt-4">
      <button
        type="submit"
        :disabled="!validForm()"
        class="btn btn-outline-primary btn-lg"
      >
        Login
      </button>
    </div>
    <div class="col-12 d-flex justify-content-center mt-1">
      <router-link :to="{ name: 'register' }" class="link-secondary mt-3">
        Registrarse
      </router-link>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../../../shared/composables/useAuth";

export default {
  setup() {
    const { loginUser } = useAuth();

    const seePassword = ref(false);
    const loginForm = ref({
      username: "",
      password: "",
    });

    return {
      loginForm,
      seePassword,
      validForm: () => !!loginForm.value.username && !!loginForm.value.password,
      onSubmit: async () => {
        await loginUser(loginForm.value);
      },
    };
  },
};
</script>

<style scoped>
.img-see {
  width: 50px;
  height: 100%;
  cursor: pointer;
}

.see-img {
  filter: invert(20%);
  margin: auto;
}
</style>
