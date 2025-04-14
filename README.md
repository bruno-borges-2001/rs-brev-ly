# Brev.ly

Brev.ly é uma aplicação para gerenciamento de urls encurtadas, construída com tecnologias atuais e boas práticas de desenvolvimento.

## ✅ Requisitos Funcionais

- [x] Deve ser possível criar um link
- [x] Não deve ser possível criar um link com encurtamento mal formatado
- [x] Não deve ser possível criar um link com encurtamento já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio do encurtamento
- [x] Deve ser possível listar todas as URL's cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível baixar um CSV com o relatório dos links criados

## ⚡ Regras de Front-end

- [x] É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como bundler
- [x] Siga o mais fielmente possível o layout do Figma
- [x] Trabalhe com elementos que tragam uma boa experiência ao usuário (empty state, ícones de carregamento, bloqueio de ações a depender do estado da aplicação)
- [x] Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares

## 🚀 Tecnologias

### Backend

- Node.js
- TypeScript
- Fastify
- Drizzle ORM
- PostgreSQL
- AWS S3
- Docker
- Vitest (Testes)

### Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- React Query
- React Hook Form
- Zod
- React Router
- Phosphor Icons

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- PNPM
- Docker e Docker Compose
- Conta AWS (para armazenamento S3) ou Cloudflare (R2)

## 🛠️ Configuração do Ambiente

### Backend

1. Entre no diretório do servidor:

```bash
cd server
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o banco de dados com Docker:

```bash
docker-compose up -d
```

5. Execute as migrações:

```bash
pnpm db:migrate
```

6. Inicie o servidor em modo de desenvolvimento:

```bash
pnpm dev
```

### Frontend

1. Entre no diretório web:

```bash
cd web
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

## 🧪 Testes

Para executar os testes do backend:

```bash
cd server
pnpm test
```

Para executar os testes em modo watch:

```bash
pnpm test:watch
```

## 📦 Scripts Disponíveis

### Backend

- `pnpm dev`: Inicia o servidor em modo de desenvolvimento
- `pnpm build`: Compila o projeto
- `pnpm start`: Inicia o servidor em produção
- `pnpm test`: Executa os testes
- `pnpm db:generate`: Gera as migrações do banco de dados
- `pnpm db:migrate`: Executa as migrações do banco de dados
- `pnpm db:studio`: Abre o Drizzle Studio para gerenciamento do banco

### Frontend

- `pnpm dev`: Inicia o servidor de desenvolvimento
- `pnpm build`: Compila o projeto para produção
- `pnpm preview`: Visualiza a versão de produção localmente
- `pnpm lint`: Executa o linter

## 🐳 Docker

O projeto inclui configurações Docker para facilitar o desenvolvimento e deploy:

```bash
docker-compose up -d
```
