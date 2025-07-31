<template>
  <div class="pagina-categorias">
    <h2>Gestão de Categorias</h2>

    <div v-if="mensagem" :class="['mensagem-feedback', mensagemTipo]">
      {{ mensagem }}
    </div>

    <form @submit.prevent="salvarCategoria" class="formulario-categoria">
      <h3>{{ categoriaEditando ? 'Editar Categoria' : 'Adicionar Nova Categoria' }}</h3>
      <div class="form-grupo">
        <label for="nomeCategoria">Nome da Categoria:</label>
        <input type="text" id="nomeCategoria" v-model="novaCategoria.nome" required placeholder="Ex: Informática">
      </div>
      <button type="submit" class="btn btn-primario">
        <i class="fas fa-save"></i> {{ categoriaEditando ? 'Salvar Edição' : 'Adicionar Categoria' }}
      </button>
      <button type="button" v-if="categoriaEditando" @click="cancelarEdicao" class="btn btn-secundario" style="margin-left: 10px;">
        <i class="fas fa-times"></i> Cancelar
      </button>
    </form>

    <hr>

    <h3>Lista de Categorias</h3>
    <ul class="lista-itens">
      <li v-for="categoria in categorias" :key="categoria.id" class="item-lista">
        <div>
          <strong>{{ categoria.nome }}</strong>
        </div>
        <div class="item-acoes">
          <button @click="editarCategoria(categoria.id)" class="btn btn-secundario">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button @click="confirmarRemocao(categoria.id)" class="btn btn-erro">
            <i class="fas fa-trash-alt"></i> Remover
          </button>
        </div>
      </li>
      <li v-if="categorias.length === 0" class="item-lista">Nenhuma categoria cadastrada.</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PaginaCategorias',
  data() {
    return {
      categorias: JSON.parse(localStorage.getItem('categorias')) || [],
      
      novaCategoria: {
        id: null,
        nome: ''
      },
      categoriaEditando: null,
      mensagem: '',
      mensagemTipo: ''
    };
  },
  methods: {
    gerarIdUnico() {
      return 'cat-' + Date.now() + Math.random().toString(16).slice(2);
    },
    salvarCategoria() {
      if (this.categoriaEditando) {
        const index = this.categorias.findIndex(c => c.id === this.categoriaEditando);
        if (index !== -1) {
          this.categorias.splice(index, 1, { ...this.novaCategoria });
          this.exibirMensagem('Categoria atualizada com sucesso!', 'sucesso');
        }
        this.categoriaEditando = null;
      } else {
        this.novaCategoria.id = this.gerarIdUnico();
        this.categorias.push({ ...this.novaCategoria });
        this.exibirMensagem('Categoria adicionada com sucesso!', 'sucesso');
      }
      this.limparFormulario();
      this.salvarCategoriasNoLocalStorage();
    },
    editarCategoria(id) {
      this.categoriaEditando = id;
      const categoria = this.categorias.find(c => c.id === id);
      if (categoria) {
        this.novaCategoria = { ...categoria };
      }
    },

    confirmarRemocao(id) {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        const categoriaEmUso = produtos.some(p => p.idCategoria === id);

        if (categoriaEmUso) {
            this.exibirMensagem('Não é possível remover. Esta categoria está em uso por produtos.', 'erro');
            return;
        }

        if (confirm('Tem certeza que deseja remover esta categoria?')) {
            this.removerCategoria(id);
        }
    },
    removerCategoria(id) {
      this.categorias = this.categorias.filter(c => c.id !== id);
      this.exibirMensagem('Categoria removida com sucesso!', 'sucesso');
      this.salvarCategoriasNoLocalStorage(); // Persistir dados
      this.limparFormulario();
    },
    cancelarEdicao() {
      this.categoriaEditando = null;
      this.limparFormulario();
      this.exibirMensagem('Edição cancelada.', 'aviso');
    },
    limparFormulario() {
      this.novaCategoria = {
        id: null,
        nome: ''
      };
    },
    exibirMensagem(texto, tipo) {
      this.mensagem = texto;
      this.mensagemTipo = `mensagem-${tipo}`;
      setTimeout(() => {
        this.mensagem = '';
        this.mensagemTipo = '';
      }, 3000);
    },
    salvarCategoriasNoLocalStorage() {
      localStorage.setItem('categorias', JSON.stringify(this.categorias));
    }
  },
  mounted() {
    if (this.categorias.length === 0) {
      this.categorias = [
        { id: 'cat-1', nome: 'Eletrônicos' },
        { id: 'cat-2', nome: 'Livros' },
        { id: 'cat-3', nome: 'Roupas' }
      ];
      this.salvarCategoriasNoLocalStorage();
    }
  }
};
</script>

<style scoped>
.pagina-categorias h2, .pagina-categorias h3 {
  color: var(--cor-primaria);
  text-align: center;
  margin-bottom: 20px;
}

.formulario-categoria {
  background-color: var(--cor-fundo);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px var(--cor-sombra);
  margin-bottom: 30px;
}

hr {
  border: 0;
  height: 1px;
  background-color: var(--cor-borda);
  margin: 30px 0;
}
</style>