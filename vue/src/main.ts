import { LOAD_STORED_STATE } from "./store/constants";

import { createApp } from "vue";
import App from "@/App.vue";
import "./assets/tailwind.css";
import router from "./router";
import store, { key } from "./store";
import { OnClickOutside } from "@vueuse/components";

/*********************************
 * Import axios and set defaults *
 ********************************/
import axios from "axios";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.withCredentials = true;

/***************************************************
 * Import the font awesome library modules we need *
 **************************************************/
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faDoorOpen,
  faEnvelopeSquare,
  faLock,
  faSpinner,
  faUser,
  faChevronDown,
  faCheck,
  faCircleXmark,
  faBars,
  faXmark,
  faMagnifyingGlass,
  faDumbbell,
  faCircleExclamation,
  faCircleCheck,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUser);
library.add(faLock);
library.add(faDoorOpen);
library.add(faSpinner);
library.add(faEnvelopeSquare);
library.add(faChevronDown);
library.add(faCheck);
library.add(faCircleXmark);
library.add(faBars);
library.add(faXmark);
library.add(faMagnifyingGlass);
library.add(faBell as IconDefinition);
library.add(faDumbbell);
library.add(faCircleExclamation);
library.add(faCircleCheck);
library.add(faUserTie);

/****************************
 * Import custom components *
 ***************************/
import ToastsList from "./components/toasts/ToastsList.vue";

/*********************************************************************
 *  Create the Vue application instance, creating global components, *
 *  use necessary libraries and mount the root element.              *
 ********************************************************************/
createApp({
  extends: App,
  beforeCreate() {
    this.$store.dispatch(LOAD_STORED_STATE);
  },
})
  .use(store, key)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("toasts-list", ToastsList)
  .directive("click-outside", OnClickOutside)
  .mount("#app");
