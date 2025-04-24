import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "../style.css";
import MovieDetailPage from "./pages/MovieDetailPage.vue";
import HomePage from "./pages/HomePage.vue";

// import and setup Vue Router here
// 💡 HINT: You'll also need to import your page components

const routes = [
  { path: "/:id(\\d+)", name: "movie", component: MovieDetailPage },
  { path: "/", name: "root", component: HomePage },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
const app = createApp(App);
app.use(router);
app.mount("#app");
