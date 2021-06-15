import Home from "../page/home/index.vue";
import Swiper from "../page/swiper/index.vue";
export default [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    name: "Home",
  },
  {
    path: "/swiper",
    component: Swiper,
    name: "Swiper",
  },
];
