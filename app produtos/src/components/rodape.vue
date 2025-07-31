<template>
  <footer class="rodape">
    <p>&copy; {{ anoAtual }} Gestão de Produtos. Todos os direitos reservados.</p>
    <p>Desenvolvido com <i class="fas fa-heart" style="color: #dc3545;"></i> e Vue.js</p>
  </footer>
</template>

<script>
export default {
  name: 'RodapeApp',
  data() {
    return {
      anoAtual: new Date().getFullYear()
    };
  }
}
</script>

<style scoped>
.rodape {
    background-color: var(--cor-texto);
    color: white;
    text-align: center;
    padding: 20px;
    margin-top: auto;
    box-shadow: 0 -2px 5px var(--cor-sombra);
    font-size: 0.9em;
}

.rodape p {
    margin: 5px 0;
}
</style>