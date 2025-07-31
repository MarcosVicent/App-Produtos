<template>
  <header class="cabecalho">
    <div class="logo">
      <router-link to="/">
        <i class="fas fa-box-open"></i> Gestão de Produtos
      </router-link>
    </div>
    <nav class="navegacao-principal">
      <router-link to="/produtos" class="link-nav">Produtos</router-link>
      <router-link to="/categorias" class="link-nav">Categorias</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'CabecalhoApp'
}
</script>

<style scoped>
.cabecalho {
    background-color: var(--cor-primaria);
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px var(--cor-sombra);
}

.cabecalho .logo a {
    color: white;
    font-size: 1.5em;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
}

.cabecalho .logo a:hover {
    text-decoration: none;
}

.navegacao-principal .link-nav {
    color: white;
    margin-left: 20px;
    font-weight: bold;
}

.navegacao-principal .link-nav:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .cabecalho {
        flex-direction: column;
        gap: 15px;
        padding: 15px;
    }
    .navegacao-principal {
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
    .navegacao-principal .link-nav {
        margin-left: 0;
    }
}
</style>