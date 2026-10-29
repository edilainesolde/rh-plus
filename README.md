
# SENAI CFP 404 Sorocaba Itavuvu — Gestão de Prazos e Rotinas de RH (RH+)

Aplicação web desenvolvida em **React** e **Vite** para auxiliar o setor administrativo e de Recursos Humanos do **SENAI CFP 404 Sorocaba Itavuvu** no acompanhamento de vencimentos de férias, conferência administrativa de atestados médicos e controle de licenças/faltas remuneradas previstas no Acordo Coletivo de Trabalho.

---

## 📌 Repositório Oficial
- **GitHub:** [https://github.com/edilainesolde/rh-plus](https://github.com/edilainesolde/rh-plus)

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18.0 ou superior)
- **npm** instalado

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/edilainesolde/rh-plus.git](https://github.com/edilainesolde/rh-plus.git)
   cd rh-plus

```

2. **Instalar as dependências:**
```bash
npm install

```


3. **Gerar/Atualizar a estrutura de arquivos (caso necessário):**
```bash
node setup.js

```


4. **Iniciar o servidor de desenvolvimento:**
```bash
npm run dev

```


5. Acesse no navegador: `http://localhost:5173`

---

## 💡 Mapeamento de Onde os Conceitos React Foram Aplicados

Abaixo está o detalhamento prático de como cada requisito da atividade foi implementado na estrutura do projeto:

---

### 1. State e `useState`

O gerenciamento de estado interno foi aplicado em múltiplos níveis da aplicação para controlar dados dinâmicos da interface e entradas do usuário.

* **Onde foi aplicado:**
* `src/context/AppContext.jsx`: Gerencia os estados globais da aplicação (`colaboradores`, `ferias`, `atestados`, `licencas`) e o estado didático `interactionCount`.
* `src/pages/Dashboard.jsx`: Utiliza `useState` para controlar os dados retornados pela API e o carregamento do aviso.
* `src/pages/Colaboradores.jsx`: Utiliza estados locais (`nome`, `nif`, `dataNascimento`, `msg`) para capturar os dados informados nos inputs.
* `src/components/SearchFilters.jsx`: Controla o estado de busca e filtragem por nome e situação (`searchTerm`, `statusFilter`).


* **Demonstração Didática (Contador):**
* Na tela **Dashboard**, o cartão *Contador de Interações* altera dinamicamente o número na tela utilizando a função `setInteractionCount(prev => prev + 1)` acionada ao clicar no botão "Adicionar".



---

### 2. Formulários e Campos Controlados

Todos os formulários do sistema utilizam o padrão de **Campos Controlados**, onde o valor do input é ligado diretamente a um estado e atualizado a cada digitação.

* **Onde foi aplicado:**
* `src/pages/Colaboradores.jsx`: Formulário de cadastro de colaboradores com campos controlados usando `value={nome}` e `onChange={(e) => setNome(e.target.value)}`.
* `src/pages/Ferias.jsx` e `src/pages/Atestados.jsx`: Formulários para vinculação de vencimentos de férias e recebimento de atestados.


* **Validações e `preventDefault()`:**
* No evento `onSubmit` do formulário (`handleSubmit`), é executado o `e.preventDefault()` para impedir o recarregamento automático da página.
* São aplicadas validações para evitar campos vazios, impedir datas de nascimento futuras e **garantir a unicidade do NIF** (evitando duplicidades mesmo com formatações diferentes).



---

### 3. `useEffect`

O hook `useEffect` foi utilizado para lidar com efeitos colaterais e ações assíncronas durante o ciclo de vida dos componentes.

* **Onde foi aplicado:**
* `src/pages/Dashboard.jsx`: Executa uma chamada assíncrona assim que o componente é montado na tela para carregar um comunicado via API externa.
* `src/pages/ConceitosReact.jsx`: Utilizado em um exemplo didático que dispara um timer (`setInterval`) no momento da montagem e limpa a memória (`clearInterval`) quando o componente é desmontado.



---

### 4. Consumo de APIs

A integração com serviços externos foi implementada de forma assíncrona para demonstrar o recebimento e tratamento de dados HTTP.

* **Onde foi aplicado:**
* `src/services/apiService.js`: Função `fetchExternalNotice()` que utiliza `fetch()` para realizar uma requisição `GET` na API pública JSONPlaceholder (`https://jsonplaceholder.typicode.com/posts/1`).
* `src/pages/Dashboard.jsx`: Consome essa função, trata estados de carregamento (*Loading*) e exibe o informativo dinâmico no painel principal.



---

### 5. React Router (`react-router-dom`)

Navegação entre diferentes visões sem recarregar a página (*Single Page Application — SPA*).

* **Onde foi aplicado:**
* `src/App.jsx`: Configura o `<BrowserRouter>`, `<Routes>` e cada `<Route path="..." element={...}>`.
* `src/components/Sidebar.jsx`: Utiliza componentes `<NavLink>` para alternar entre páginas com destaque visual na rota selecionada.


* **Rotas configuradas no sistema:**
* `/` — Dashboard Inicial (Indicadores e Alertas de Férias);
* `/colaboradores` — Cadastro e Consulta com Validação de NIF;
* `/ferias` — Controle de Vencimentos e Prazos;
* `/atestados` — Gestão Administrativa de Atestados;
* `/licencas` — Acompanhamento dos Itens 23 a 31 do Acordo Coletivo;
* `/relatorios` — Exportação de Dados para Planilha Excel (`.xlsx`);
* `/conceitos` — Demonstração Didática dos Conceitos React;
* `/sobre` — Informações Institucionais e LGPD;
* `*` — Tratamento de Rota Inexistente (`NotFound.jsx`).



---

## 📊 Exportação de Relatórios para Excel

O sistema integra a biblioteca **`xlsx`** (`src/utils/exportExcel.js`) para permitir a geração e download de arquivos `.xlsx` compatíveis com Microsoft Excel e LibreOffice Calc.

* **Garantia de Integridade:** O campo NIF é exportado explicitamente como texto (`string`) para impedir que o Excel remova zeros à esquerda ou altere a formatação original do identificador.

---

## 🛡️ Segurança, Minimização de Dados e LGPD

* **Dados Fictícios:** Todo o ambiente de demonstração e o repositório público utilizam estritamente dados simulados.
* **Privacidade Médica:** O módulo de atestados médicos não coleta nem armazena diagnósticos clínicos, CID ou anexos, limitando-se ao controle do fluxo administrativo exigido pela instituição.

---

## 🛠️ Tecnologias Utilizadas

* **React 18** (Vite)
* **JavaScript (ES6+)**
* **React Router DOM 6**
* **Tailwind CSS** (Estilização responsiva institucional)
* **Lucide React** (Ícones da interface)
* **XLSX (SheetJS)** (Gerador de planilhas)
