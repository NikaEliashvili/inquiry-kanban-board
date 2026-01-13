# Project Overview

This project is built by **Next.js 14 (App Router)**. Application demonstrates a kanban-style inquiry board with **drag-and-drop**, **optimistic UI updates**, and **URL-synced filters**.

The goal is to show clean architecture, predictable state management, and a user-friendly UX while keeping the implementation lightweight and maintainable.

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or pnpm

### Install dependencies

```bash
npm install
# or
pnpm install
```

### Run the development server

```bash
npm run dev
# or
pnpm dev
```

Open `http://localhost:3000` in your browser.

---

## Project Structure Overview

```
app/
  api/
    inquiries/route.ts         # GET API for inquiries list
    inquiries/[id]/route.ts    # PATCH API for phase updates
  loading.tsx                  # Loading skeleton
  page.tsx                     # Main page

actions/
    get-inquiries.ts           # action to call the API and GET inquiries list
    update-inquiry.ts          # action to call the API and PATCH inquiry phase

components/
  kanban/                      # Kanban board & column & card & modal
  filters/                     # Filters panel and its related components

store/
  filters-store.ts             # Zustand store for filters
  inquiry-store.ts             # Zustand store for inquiries

lib/
  utils.ts                     # Shared helpers (formatting, delay, ...)

hooks/
  use-debounce.ts              # useDebounce hook

data/
  mock-inquiries.ts            # Mock data source
  data-handler.ts              # Data mutation helpers

types/
  inquiry.ts                   # Shared domain types
```

---

## Libraries Used & Why

### Zustand

- Lightweight state management
- Minimal boilerplate

### @dnd-kit

- Lightweight drag-and-drop
- Full control over drag logic
- No DOM mutation side effects

### date-dns

- Lightweight date utility library
- Excellent formatting
- Small bundle size

### lucide-react

- Lightweight SVG icon library
- Consistent and modern icon set
- React-first API

### clsx

- Utility for conditional class names
- Keeps JSX clean and readable
- Minimal and dependency-free
- Used with tailwind-merge for Tailwind classes.

---

## Notes for Reviewer

- API errors are handled explicitly via HTTP status checks
- Optimistic updates are reverted on failure
- Filters are synced to URL search params for shareable state

### To Check optimistic updates on Error:

##### API Always throws Error on this inquiry for checking purposes

- ID: **INQ-2026-0039**
- ClientName: **Zurich Insurance**

---
