# Forchete: Full-Stack News Aggregator

<p align="center">
  <img src="showcase.gif" alt="Forchete Demo"/>
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

### 1. Run the Back-end & Database (Docker)

The simplest way to run the entire backend is with Docker Compose.

```bash
# Clone the repository
git clone [https://github.com/your-username/forchete.git](https://github.com/your-username/forchete.git)
cd forchete/backend

# Build and start the containers in detached mode
docker compose up -d
