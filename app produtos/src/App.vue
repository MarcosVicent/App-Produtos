<template>
  <div id="app">
    <CabecalhoApp />
    <main class="conteudo-principal">
      <router-view />
    </main>
    <RodapeApp />
  </div>
</template>

<script>
import CabecalhoApp from './components/CabecalhoApp.vue';
import RodapeApp from './components/RodapeApp.vue';

export default {
  name: 'App',
  components: {
    CabecalhoApp,
    RodapeApp
  }
}
</script>
