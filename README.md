# challenge-01

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **tRPC** - End-to-end type-safe APIs
- **Bun** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **SQLite/Turso** - Database engine
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
bun install
```
## Database Setup

This project uses SQLite with Drizzle ORM.

1. Obtain token from [Turso](https://turso.tech/).

2. Update your `.env` file in the `apps/server` and `apps/web` directories with the appropriate connection details.

3. Apply the schema to your database:
```bash
bun db:push
```

4. Seed your database:
```bash
cd apps/server && bun db:seed
```


Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.

The API is running at [http://localhost:3000](http://localhost:3000).



## Project Structure

```
challenge-01/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Hono, TRPC)
```

## The Challenge: Implement Infinite Scrolling and Performance Optimization

Your task is to transform the index page from a simple data display into a high-performance, infinitely scrolling list of products. This will test your ability to optimize both the backend query and the frontend rendering pipeline using the modern features of this tech stack.

### Core Requirements

#### 1. Backend API (`apps/server`)

-   **Implement Basic Pagination:**
    -   Modify the existing `getAllProducts` tRPC procedure to support pagination using `limit` and `offset`.
    -   The procedure's input should be a Zod object that accepts an optional `limit` and `offset`, like: `z.object({ limit: z.number().optional(), offset: z.number().optional() })`.
    -   The procedure should simply return the array of products for the requested page.

#### 2. Frontend UI (`apps/web`)

-   **Improve Initial Page Load Experience:**
    -   The main page (`/`) should not block rendering while waiting for the initial batch of products.
    -   Use **React Suspense** to show an instant loading state (e.g., a skeleton UI using `shadcn/ui` components). You can find guidance on this pattern in the [tRPC documentation on Server Components](https://trpc.io/docs/client/tanstack-react-query/server-components).

-   **Implement Infinite Scrolling:**
    -   Refactor the data fetching logic on the page to use tRPC's **`useInfiniteQuery`** hook.
    -   You will need to configure the hook to calculate the correct `offset` for each subsequent page request.
    -   As the user scrolls towards the bottom of the product list, the `fetchNextPage` function from the hook should be triggered to load the next set of products.
    -   The new products should be appended seamlessly to the existing list.

-   **Virtualize the Table:**
    -   To ensure the UI remains fast and responsive even with thousands of rows, the product list must be virtualized. This means only rendering the items currently visible in the viewport.
    -   We recommend using a library like **`@tanstack/react-virtual`** for this, as it integrates well with the ecosystem.

### What We're Looking For

-   **Correctness:** The features work as described, and the page is noticeably more performant.
-   **Code Quality:** Your code is clean, readable, well-structured, and follows the existing patterns in the repository.
-   **Modern Patterns:** You correctly use modern React/Next.js patterns like Suspense and hooks (`useInfiniteQuery`).
-   **Type Safety:** You fully leverage the end-to-end type safety provided by tRPC. Changes in the backend API input/output should be reflected on the frontend without manual type definitions.
-   **Commit History:** Your git commits are clear, atomic, and tell a story of how you built the feature.

### Bonus Points (Optional)

These are not required, but implementing them would be a great way to impress us:

-   **Refactor to Cursor-Based Pagination:** For improved performance and data consistency, refactor the `limit`/`offset` API to use a cursor. This involves:
    -   Updating the backend procedure to accept a `cursor` (e.g., the ID of the last item) and return an object containing the `items` and a `nextCursor`.
    -   Updating the frontend `useInfiniteQuery` logic to use this new cursor-based flow.

-   **Real-time Filtering:** Add a search input field above the table. As the user types, filter the product list in real-time. This will require creating a new tRPC procedure that accepts a search term and also supports pagination. Debouncing the input is highly encouraged.

## Task Process 
-   **Implement Cursor-Based Pagination** Done ✔️
-   **Improve Initial Page Load Experience** Done ✔️
-   **Implement Infinite Scrolling** Done ✔️
-   **Virtualize the Table** Done ✔️
-   **Real-time Filtering** Done ✔️

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun dev:server`: Start only the server
- `bun check-types`: Check TypeScript types across all apps
- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open database studio UI
- `bun check`: Run Biome formatting and linting
