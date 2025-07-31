<template>
  <div class="pagina-produtos">
    <h2>Gestão de Produtos</h2>

    <div v-if="mensagem" :class="['mensagem-feedback', mensagemTipo]">
      {{ mensagem }}
    </div>

    <form @submit.prevent="salvarProduto" class="formulario-produto">
      <h3>{{ produtoEditando ? 'Editar Produto' : 'Adicionar Novo Produto' }}</h3>
      <div class="form-grupo">
        <label for="nomeProduto">Nome do Produto:</label>
        <input type="text" id="nomeProduto" v-model="novoProduto.nome" required placeholder="Ex: Notebook Gamer">
      </div>
      <div class="form-grupo">
        <label for="precoProduto">Preço:</label>
        <input type="number" id="precoProduto" v-model.number="novoProduto.preco" required min="0.01" step="0.01" placeholder="Ex: 2500.00">
      </div>
      <div class="form-grupo">
        <label for="categoriaProduto">Categoria:</label>
        <select id="categoriaProduto" v-model="novoProduto.idCategoria" required>
          <option value="" disabled>Selecione uma Categoria</option>
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
            {{ categoria.nome }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primario">
        <i class="fas fa-save"></i> {{ produtoEditando ? 'Salvar Edição' : 'Adicionar Produto' }}
      </button>
      <button type="button" v-if="produtoEditando" @click="cancelarEdicao" class="btn btn-secundario" style="margin-left: 10px;">
        <i class="fas fa-times"></i> Cancelar
      </button>
    </form>

    <hr>

    <h3>Lista de Produtos</h3>
    <ul class="lista-itens">
      <li v-for="produto in produtosFormatados" :key="produto.id" class="item-lista">
        <div>
          <strong>{{ produto.nome }}</strong><br>
          Preço: {{ produto.precoFormatado }} | Categoria: {{ produto.nomeCategoria }}
        </div>
        <div class="item-acoes">
          <button @click="editarProduto(produto.id)" class="btn btn-secundario">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button @click="confirmarRemocao(produto.id)" class="btn btn-erro">
            <i class="fas fa-trash-alt"></i> Remover
          </button>
        </div>
      </li>
      <li v-if="produtos.length === 0" class="item-lista">Nenhum produto cadastrado.</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PaginaProdutos',
  data() {
    return {
      produtos: JSON.parse(localStorage.getItem('produtos')) || [],
      categorias: JSON.parse(localStorage.getItem('categorias')) || [
        { id: 'cat-1', nome: 'Eletrônicos' },
        { id: 'cat-2', nome: 'Livros' },
        { id: 'cat-3', nome: 'Roupas' }
      ],
      
      novoProduto: {
        id: null,
        nome: '',
        preco: 0,
        idCategoria: ''
      },
      produtoEditando: null,
      mensagem: '',
      mensagemTipo: ''
    };
  },
  computed: {
    produtosFormatados() {
      return this.produtos.map(produto => {
        const categoria = this.categorias.find(cat => cat.id === produto.idCategoria);
        return {
          ...produto,
          precoFormatado: `R$ ${produto.preco.toFixed(2).replace('.', ',')}`,
          nomeCategoria: categoria ? categoria.nome : 'Sem Categoria'
        };
      });
    }
  },
  methods: {
    gerarIdUnico() {
      return 'prod-' + Date.now() + Math.random().toString(16).slice(2);
    },

    salvarProduto() {
      if (this.produtoEditando) {
        const index = this.produtos.findIndex(p => p.id === this.produtoEditando);
        if (index !== -1) {
          this.produtos.splice(index, 1, { ...this.novoProduto });
          this.exibirMensagem('Produto atualizado com sucesso!', 'sucesso');
        }
        this.produtoEditando = null;
      } else {
        this.novoProduto.id = this.gerarIdUnico();
        this.produtos.push({ ...this.novoProduto });
        this.exibirMensagem('Produto adicionado com sucesso!', 'sucesso');
      }
      this.limparFormulario();
      this.salvarProdutosNoLocalStorage();
    },
    
    editarProduto(id) {
      this.produtoEditando = id;
      const produto = this.produtos.find(p => p.id === id);
      if (produto) {
        this.novoProduto = { ...produto }; 
      }
    },

    confirmarRemocao(id) {
      if (confirm('Tem certeza que deseja remover este produto?')) {
        this.removerProduto(id);
      }
    },
    removerProduto(id) {
      this.produtos = this.produtos.filter(p => p.id !== id);
      this.exibirMensagem('Produto removido com sucesso!', 'sucesso');
      this.salvarProdutosNoLocalStorage();
      this.limparFormulario();
    },
    cancelarEdicao() {
      this.produtoEditando = null;
      this.limparFormulario();
      this.exibirMensagem('Edição cancelada.', 'aviso');
    },
    limparFormulario() {
      this.novoProduto = {
        id: null,
        nome: '',
        preco: 0,
        idCategoria: ''
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
    
    salvarProdutosNoLocalStorage() {
      localStorage.setItem('produtos', JSON.stringify(this.produtos));
    }
  },
  mounted() {
    if (this.categorias.length === 0) {
      this.salvarCategoriasNoLocalStorage();
    }
  }
};
</script>

<style scoped>
.pagina-produtos h2, .pagina-produtos h3 {
  color: var(--cor-primaria);
  text-align: center;
  margin-bottom: 20px;
}

.formulario-produto {
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