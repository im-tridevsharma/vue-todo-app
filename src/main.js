import { createApp } from "vue";
import App from "./App.vue";

import router from "./routes";
import store from "./store";

import { user } from "./_helper";

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");

if (user && user.id !== null && user.id !== "undefined") {
  store.dispatch("fetchUserProfile", user);
  console.log("User is valid!");
}
