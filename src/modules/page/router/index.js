export default {
  name: "page",
  component: () =>
    import(
      /* webpackChunkName: "Page Layout" */ "@/modules/page/layouts/PageLayout.vue"
    ),
};
