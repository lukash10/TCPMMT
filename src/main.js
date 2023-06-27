import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import GmapVue from 'gmap-vue';
import VueOffline from 'vue-offline'

import Login from './Views/Login.vue';
import Dashboard from './Views/Dashboard.vue';
import Registrar from './Views/Registrar.vue';
import Home from './Views/Home.vue';
import Caso from './Views/Caso.vue';
import Generic from './Views/Generic.vue';

import db from './plugins/db.js';

import FormNegativaEndereco from './components/FormNegativaEndereco.vue';
import FormVisita1 from './components/FormVisita1.vue';
import FormVisitaAcompanhamento from './components/FormVisitaAcompanhamento.vue';
import FormVisitaVulneravel from './components/FormVisitaVulneravel.vue';
import FormAutorFato from './components/FormAutorFato.vue';
import FormTermino from './components/FormTermino.vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// router services
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(db)
Vue.use(require('vue-cookies'))
Vue.use(VueOffline)
import './registerServiceWorker'

Vue.$cookies.config('600d')

Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyCFxTn-RwaW2Xlb8abph5S-FuMS3RERaFg',
    libraries: 'places,visualization,drawing',
  },
  installComponents: true,
});

const routes = [
  { path: '/', component: Login },
  { path: '/signup', component: Registrar },
  { path: '/home', component: Home },
  { path: '/dashboard', component: Dashboard },
  { path: '/generic', component: Generic },

  //Formulários
  { path: '/form_negativa', component: FormNegativaEndereco },
  { path: '/form_visita1', component: FormVisita1 },
  { path: '/form_visita_acompanhamento', component: FormVisitaAcompanhamento },
  { path: '/form_visita_vulneravel', component: FormVisitaVulneravel },
  { path: '/form_autor_fato', component: FormAutorFato },
  { path: '/form_termino', component: FormTermino },
  { path: '/caso', component: Caso },
]


let router = new VueRouter({
  routes: routes,
  mode: 'hash',
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');


