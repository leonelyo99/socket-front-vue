<template>
  <section id="wrapper" class="error-page">
    <div class="error-box">
      <div class="error-body text-center">
        <h1>404</h1>
        <h3 class="text-uppercase">¡Página no encontrada!</h3>
        <p class="text-muted m-t-30 m-b-30">
          La página a la que desea acceder no existe
        </p>
        <button
          type="button"
          @click="$router.go(-1)"
          class="btn m-b-40 btn-primary"
        >
          Volver
        </button>
      </div>
      <br />
    </div>
  </section>
</template>

<style scoped>
.error-box {
  height: 100%;
  position: fixed;
  width: 100%;
  overflow-y: auto;
}
.footer {
  width: 100%;
  left: 0px;
  right: 0px;
}
.error-body {
  padding-top: 2%;
}
h1 {
  font-size: 200px;
  font-weight: 900;
  text-shadow: 4px 4px 0 white, 6px 6px 0 dark;
  line-height: 210px;
}
</style>
