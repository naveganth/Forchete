# Forchete

<p align="center">
  <img src="URL_TO_YOUR_GIF_HERE" alt="Forchete Demo"/>
</p>

Agregador de notícias que coleta manchetes, notícias e postagens de todos os portais de Macapá e os organiza em artigos a serem disponibilizados em um portal.

## Stack Utilizada

**Front-end:**
* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Mantine](https://mantine.dev/)
* [React Query](https://tanstack.com/query/latest)

**Back-end:**
* [Rust](https://www.rust-lang.org/) (composto por workspaces: `api`, `scraper`, `db`, `noticia`)
* [MySQL](https://www.mysql.com/)

## Rodando o Projeto

### Pré-requisitos

* [Node.js](https://nodejs.org/en) (para o front-end)
* [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (para o back-end e banco de dados)

### Back-end (com Docker)

O back-end e o banco de dados podem ser iniciados usando Docker Compose.

```bash
# Navegue até a pasta 'backend'
cd backend

# Suba os serviços
docker-compose up -d
