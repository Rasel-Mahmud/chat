# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo chat application using Bun workspaces with a React client and Express server.

**Runtime:** Bun (v1.2.23+) - used for the server and package management
**Structure:** Monorepo with workspaces in `packages/`

- `packages/client` - React + Vite frontend
- `packages/server` - Express backend with Bun runtime

## Development Commands

### Root Level

```bash
bun install              # Install all dependencies across workspaces
```

### Client (packages/client)

```bash
cd packages/client
bun run dev             # Start Vite dev server (default: http://localhost:5173)
bun run build           # TypeScript compilation + Vite production build
bun run lint            # Run ESLint
bun run preview         # Preview production build
```

### Server (packages/server)

```bash
cd packages/server
bun run dev             # Start with hot reload (--watch flag)
bun run start           # Start server (default: http://localhost:3000)
```

**Note:** Server port defaults to 3000 (typo in code has PORT fallback as 300, should be 3000)

## Architecture

### Client-Server Communication

- Client runs on Vite dev server (port 5173 by default)
- API requests to `/api/*` are proxied to the backend server (configured in [vite.config.ts](packages/client/vite.config.ts#L8-L10))
- Server runs on port 3000 (check `process.env.PORT`)

### Environment Variables

Server requires `.env` file (see [.env.example](packages/server/.env.example)):

- `OPEN_API_KEY` - OpenAI API key (currently configured but not yet used in code)

### TypeScript Configuration

- Uses `"moduleResolution": "bundler"` for both client and server
- Client: React JSX with `"jsx": "react-jsx"`
- Server: Native Bun TypeScript execution
- Strict mode enabled with additional safety checks (`noUncheckedIndexedAccess`, `noImplicitOverride`)

## Key Implementation Details

### Development Workflow

1. Start server first: `cd packages/server && bun run dev`
2. Start client: `cd packages/client && bun run dev`
3. Client automatically proxies API calls to server via Vite proxy

### Current State

The application is in early development:

- Server has basic Express setup with example endpoints
- Client fetches from `/api/hello` but doesn't yet handle the response
- OpenAI integration is configured (API key in env) but not implemented
