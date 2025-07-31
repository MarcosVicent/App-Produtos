# Meu App de Gestão de Produtos e Categorias

Este é um mini projeto front-end desenvolvido com Vue.js 3, demonstrando conceitos de UI/UX, Design Patterns básicos e uma simulação de ambiente para DevOps.

## 🚀 Visão Geral

O objetivo principal é criar uma aplicação simples para gerenciar produtos e suas respectivas categorias. A aplicação possui duas páginas principais que se relacionam:

1.  **Produtos:** Onde é possível adicionar, listar, editar e remover produtos. Cada produto é associado a uma categoria.
2.  **Categorias:** Onde é possível adicionar, listar, editar e remover categorias.

Os dados são persistidos no `localStorage` do navegador para simular uma base de dados local, mantendo as informações mesmo após recarregar a página.

## ✨ Conceitos Aplicados

### UI/UX (Interface do Usuário e Experiência do Usuário)

* **Design Responsivo:** O layout se adapta a diferentes tamanhos de tela (desktop, tablet, mobile) através de Media Queries no CSS.
* **Feedback Visual:** Mensagens claras de sucesso, erro ou aviso são exibidas ao usuário após operações (adição, edição, remoção).
* **Navegação Clara:** Um cabeçalho com links de navegação intuitivos entre as páginas "Produtos" e "Categorias".
* **Consistência:** Uso de variáveis CSS para manter uma paleta de cores e tipografia consistentes em toda a aplicação. Botões e formulários seguem um padrão visual.
* **Usabilidade:** Campos de formulário com `placeholder`, `required` e validação básica. Confirmação para operações de remoção.

### DevOps (Conceitual/Simulado)

* **Versionamento de Código:** A estrutura do projeto é compatível com sistemas de controle de versão (ex: Git). O `package.json` gerencia dependências.
* **Automação de Build:** Utiliza os scripts padrão do Vue CLI (`npm run build`) para gerar uma versão otimizada para produção.
* **Contêinerização (Demonstração):** Incluídos `Dockerfile` e `docker-compose.yml` para mostrar como a aplicação poderia ser empacotada em um contêiner Docker para um ambiente de produção consistente e portável.

### Design Patterns (Padrões de Projeto)

* **Componentes Reutilizáveis:** `CabecalhoApp.vue` e `RodapeApp.vue` são componentes que podem ser usados em múltiplas páginas, promovendo a reutilização de código e a modularidade da UI.
* **Páginas/Views como Containers:** `PaginaProdutos.vue` e `PaginaCategorias.vue` atuam como componentes de "container", gerenciando o estado e a lógica de negócio (CRUD de dados no `localStorage`) e orquestrando a exibição dos elementos de UI.
* **Reatividade Vue:** Uso do sistema de reatividade do Vue para gerenciar o estado da aplicação e atualizar a UI automaticamente.
* **Single File Components (SFC):** O padrão `.vue` para encapsular HTML, CSS e JavaScript em um único arquivo, melhorando a organização e manutenção.

### Estrutura e Nomenclatura

* **Nomenclatura em Português:** Variáveis, classes CSS, IDs e nomes de componentes seguem a língua portuguesa para facilitar o entendimento no contexto local.
    * Ex: `PaginaProdutos`, `salvarProduto`, `lista-itens`, `btn-primario`.
* **IDs e Classes:** Utilizados para identificar elementos HTML para JavaScript (IDs) ou para aplicar estilos e comportamentos (Classes).
    * Ex: `id="app"`, `class="conteudo-principal"`.
* **Organização de Pastas:** `components` para elementos de UI menores e reutilizáveis, `views` para páginas principais associadas a rotas, `assets` para recursos estáticos.

## 🛠️ Tecnologias Utilizadas

* **Vue.js 3:** Framework JavaScript progressivo.
* **Vue Router 4:** Para navegação entre as páginas.
* **HTML5:** Estrutura da página.
* **CSS3:** Estilização (com variáveis CSS para temas).
* **Font Awesome:** Para ícones.

## ⚙️ Como Configurar e Rodar o Projeto

### Pré-requisitos

* Node.js (LTS recomendado)
* npm (gerenciador de pacotes do Node.js) ou Yarn
* Vue CLI (`npm install -g @vue/cli`)

### Instalação

1.  **Clone este repositório** (ou crie o projeto Vue CLI e copie os arquivos):
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd meu-app-produtos
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

### Rodar o Servidor de Desenvolvimento

Para rodar a aplicação em modo de desenvolvimento com hot-reloading:

```bash
npm run serve
# ou
yarn serve