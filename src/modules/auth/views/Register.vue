<template>
  <form
    @submit.prevent="onSubmit"
    class="col-12 col-sm-10 col-md-8 col-lg-5 card shadow p-4"
  >
    <h2 class="text-center">Ingrese sus datos</h2>
    <div class="col-12 mx-auto mt-4">
      <div class="input-group">
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          aria-label="Email"
          v-model.trim="registerForm.email"
          required
          minlength="3"
        />
      </div>
      <div class="input-group mt-4">
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          v-model.trim="registerForm.username"
          required
          minlength="5"
        />
      </div>
      <div class="input-group mt-4">
        <input
          :type="seePassword ? 'text' : 'password'"
          class="form-control"
          placeholder="Password"
          aria-label="Password"
          v-model.trim="registerForm.password"
          required
          minlength="5"
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
      <div class="input-group mt-4">
        <input
          :type="seeRepeatPassword ? 'text' : 'password'"
          class="form-control"
          placeholder="Repeat Password"
          aria-label="Repeat Password"
          v-model.trim="registerForm.repeatPassword"
          required
          minlength="5"
        />
        <div
          class="input-group-append"
          @click="seeRepeatPassword = !seeRepeatPassword"
        >
          <span class="img-see input-group-text">
            <img
              v-if="!seeRepeatPassword"
              src="@/assets/icons/see.svg"
              class="figure-img img-fluid see-img"
            />
            <img
              v-if="seeRepeatPassword"
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
        Registrarse
      </button>
    </div>
    <div class="col-12 d-flex justify-content-center mt-1">
      <router-link :to="{ name: 'login' }" class="link-secondary mt-3">
        Ya tengo mi cuenta
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
    const router = useRouter();
    const { createUser } = useAuth();

    const seePassword = ref(false);
    const seeRepeatPassword = ref(false);
    const registerForm = ref({
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
    });

    return {
      registerForm,
      seePassword,
      seeRepeatPassword,
      validForm: () =>
        !!registerForm.value.email &&
        !!registerForm.value.username &&
        !!registerForm.value.password &&
        registerForm.value.password === registerForm.value.repeatPassword,
      onSubmit: async () => {
        await createUser(registerForm.value);
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