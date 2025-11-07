# Forchete: Full-Stack News Aggregator

<p align="center">
  <img src="https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white" alt="Rust" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</p>

<p align="center">
  <img src="showcase.gif" alt="Forchete Demo"/>
</p>

<p align="center">
  <strong><a href="https://forchete.gabrielataide.com/">View the Live Demo</a></strong>
</p>

**Forchete** is a full-stack news aggregation platform that automatically scrapes, organizes, and displays articles from various news portals in Macapá, Brazil.

This project demonstrates a modern, decoupled architecture, combining a high-performance **Rust backend** with a dynamic **Next.js/React frontend**. The entire backend is containerized with **Docker** for reliable and reproducible deployment.

## Key Features

* **Automated Content Aggregation**: A Rust-based `scraper` service periodically fetches and parses new articles.
* **Decoupled Backend API**: A modular Rust workspace provides a clean REST API (`api`) to serve content.
* **Dynamic & Responsive Frontend**: A server-side rendered (SSR) **Next.js** application provides a fast, modern user experience.
* **Data Persistence**: Uses a **MySQL** database, managed via Docker, to store articles and related data.
* **Containerized Deployment**: The entire backend, including the database, is managed with **Docker Compose** for easy setup and production-like development.

## Technical Architecture & Tech Stack

This project is built with a clear separation of concerns between the backend and frontend.

### **Back-end**

* **Language**: **Rust**
* **Architecture**: Built as a **Rust Workspace** with modular components:
    * `api`: The core REST API service.
    * `scraper`: The standalone web scraping service.
    * `db`: Crate for database connection logic and schemas.
    * `noticia`: Crate defining the core "news" data structures.
* **Database**: **MySQL**
* **Containerization**: **Docker & Docker Compose**

### **Front-end**

* **Framework**: **Next.js**
* **Language**: **TypeScript**
* **UI**: **React** & **Mantine** UI Kit
* **State Management**: **React Query** (TanStack Query) for asynchronous state management and server-side data fetching.

## Getting Started

### Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en) (for the front-end)
* [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (for the back-end)

### 1. Run the Back-end (Docker)

The entire backend (Rust API, scraper, and MySQL database) is containerized for easy setup.

```bash
# Clone the repository
git clone [https://github.com/your-username/forchete.git](https://github.com/your-username/forchete.git)
cd forchete/backend

# Build and start all containers in detached mode
docker compose up -d
```
The API will be available at http://localhost:8000.

### 2. Run the Front-end

In a separate terminal, set up and run the frontend application.

```bash
# Navigate to the frontend directory
cd forchete/frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```
The application will be available at http://localhost:3000.

### License

This project is open-source and available under the LICENSE file.
