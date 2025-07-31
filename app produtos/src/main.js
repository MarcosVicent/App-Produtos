import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Estilos globais
import './assets/estilos.css'; 

createApp(App).use(router).mount('#app');