# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Project Setup Guide

This project consists of a backend API server and a frontend application. Follow the instructions below to get both running locally.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [pnpm](https://pnpm.io/) package manager

## Setup Instructions

### 1. Install dependencies:

```bash
pnpm install
```

### 2. Run database migrations:

```bash
pnpm run migrate
```

### 3. Seed the database with initial users:

```bash
pnpm run seed
```

### 4. Start the backend server:

```bash
pnpm run serve
```

The backend will start at `http://localhost:3001`

### 5. Start the development server:

```bash
pnpm run dev
```

### 6. Open your browser:

Navigate to `http://localhost:5173`

The frontend is configured to automatically connect to the backend at `http://localhost:3001`.

## API Endpoints

- `POST /api/login` – Verify email and password
- `GET /api/users` – List all users
- `POST /api/users` – Add a new user

## Seeded Test Users

Use these credentials to test the login functionality:

| Email               | Password     |
| ------------------- | ------------ |
| alice@example.com   | alice12345   |
| bob@example.com     | bob12345     |
| charlie@example.com | charlie12345 |

## Quick Start

Run all commands:

```bash
pnpm install
pnpm run migrate
pnpm run seed

# Terminal 1 - Backend
pnpm run serve

# Terminal 2 - Frontend
pnpm run dev
```

Then open `http://localhost:5173` in your browser and log in with one of the seeded user credentials.

## Troubleshooting

- **Port already in use:** Make sure ports 3001 (backend) and 5173 (frontend) are available
- **Connection refused:** Ensure the backend server is running before starting the frontend
- **Migration errors:** Check that your database is properly configured and accessible
