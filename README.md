# Games Next

Aplicacao web para descobrir jogos, consultar detalhes, favoritar titulos e registrar avaliacões pessoais.

Deploy: [https://games-next-theta.vercel.app/](https://games-next-theta.vercel.app/)

## Sobre o projeto

Games Next é um catálogo de jogos desenvolvido com Next.js. O app consome dados da API RAWG para exibir jogos populares, próximos lançamentos, busca por nome e páginas individuais com informações como capa, descrição, gêneros, data de lançamento, desenvolvedor e rating da API.

Usuários autenticados com Google podem salvar jogos em uma lista de favoritos e atribuir uma nota pessoal de 0 a 5 estrelas. Esses dados são persistidos em um banco PostgreSQL via Prisma.

## Principais features

- Home com hero visual, seção de jogos populares e seção de próximos lançamentos.

- Busca de jogos por nome usando a API RAWG.
  Página de detalhes para cada jogo, com imagem, descrição, gêneros, lançamento, desenvolvedor e rating.
  Login com Google via NextAuth.

- Lista privada de favoritos para usuários autenticados.
  Adição e remoção de jogos favoritos.

-Filtro local dentro da página de favoritos.

- Sistema de avaliação pessoal com modal e estrelas de 0 a 5.

- Persistência de usuários, sessões, favoritos, jogos e avaliações com Prisma e PostgreSQL.

- Layout responsivo com cabeçalho adaptado para desktop e mobile.

## Stack tecnica

- **Framework:** Next.js 16 com App Router
- **Linguagem:** TypeScript
- **UI:** React 19
- **Estilizacao:** Tailwind CSS 4
- **Autenticacao:** NextAuth 4 com Google Provider
- **Banco de dados:** PostgreSQL
- **ORM:** Prisma 7
- **Componentes e icones:** Material UI, MUI Icons e Lucide React
- **API externa:** RAWG Video Games Database API
- **Deploy:** Vercel

### Pastas principais

- `src/app`: rotas, paginas e endpoints da aplicacao usando App Router.
- `src/app/api/auth/[...nextauth]`: endpoint do NextAuth.
- `src/app/api/favorites`: endpoints para criar e remover favoritos.
- `src/app/api/rate`: endpoint para salvar ou atualizar a nota de um jogo.
- `src/components/estructure`: componentes das telas principais, como hero, grids de jogos, detalhes e favoritos.
- `src/components/layout`: header, input de busca, modal de avaliacao e estrelas.
- `src/lib`: configuracoes de Prisma, NextAuth e funcoes de consumo da API RAWG.
- `src/context`: contexto usado pelo campo de busca.
- `src/types`: tipos TypeScript para jogos e favoritos.
- `prisma/schema.prisma`: modelos do banco de dados.

## Modelo de dados

O schema Prisma define os modelos usados pelo NextAuth e pelas funcionalidades do app:

- `User`, `Account`, `Session` e `VerificationToken`: estrutura de autenticacao do NextAuth.
- `Game`: jogo salvo localmente a partir do ID externo da RAWG.
- `Favorite`: relação única entre usuário e jogo favoritado.
- `Rating`: nota única de um usuário para um jogo.

## Como rodar localmente

### Pre-requisitos

- Node.js compativel com Next.js 16
- npm
- Banco PostgreSQL
- Credenciais do Google OAuth
- Chave da API RAWG

### Instalacao

```bash
npm install
```

### Variaveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as variaveis usadas pela aplicacao:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta"
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"
API_KEY="sua-chave-da-rawg"
```

Observacao: o arquivo `.env` local tambem possui `NODE_ENV` e `Antiga_LOCAL`, mas as variaveis diretamente usadas pelo codigo da aplicacao sao `DATABASE_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` e `API_KEY`. `NEXTAUTH_URL` e `NEXTAUTH_SECRET` sao usadas pela configuracao do NextAuth em ambiente local e de deploy.

### Banco de dados

Gere o client do Prisma:

```bash
npm run generate
```

Sincronize o schema com o banco:

```bash
npm run db:push
```

Opcionalmente, abra o Prisma Studio:

```bash
npm run studio
```

### Servidor de desenvolvimento

```bash
npm run dev
```

Depois acesse [http://localhost:3000](http://localhost:3000).

## Possiveis melhorias

- Incluir testes automatizados para os endpoints de favoritos e avaliacões.
- Implementar paginação nos resultados da RAWG.
