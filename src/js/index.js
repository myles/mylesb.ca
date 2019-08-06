import Vue from 'vue';

import '../scss/index.scss';
import '../index.html';

import BennAliveFor from './components/BeenAliveFor.vue';

window.onload = function () {
  Vue.component('been-alive-for', BennAliveFor);

  const app = new Vue().$mount('#app');;
};
