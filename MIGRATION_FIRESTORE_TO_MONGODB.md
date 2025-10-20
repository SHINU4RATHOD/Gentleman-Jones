# Migration: Firestore -> MongoDB

This repository was migrated from Firestore to MongoDB (Mongoose) while preserving Firebase Authentication for user auth.

Summary of changes:

- Added Mongoose dependency and a connection helper:
  - `src/lib/mongodb/connection.ts`
- Added a User model (Mongoose):
  - `src/models/User.ts`
- Added server-side API endpoints for user CRUD:
  - `src/app/api/users/route.ts` (POST for create/update)
  - `src/app/api/users/[uid]/route.ts` (GET, PUT)
- Replaced client Firestore writes with calls to `/api/users` in:
  - `src/app/signup/page.tsx` (POST /api/users)
  - `src/app/admin/login/page.tsx` (GET /api/users/:uid, POST /api/users)
- Replaced Firestore real-time hooks with fetch-based hooks:
  - `src/firebase/firestore/use-collection.tsx` (fetch + optional polling)
  - `src/firebase/firestore/use-doc.tsx` (fetch + optional polling)
- Converted non-blocking Firestore write helpers to fetch-based helpers:
  - `src/firebase/non-blocking-updates.tsx`
- Removed Firestore initialization from `src/firebase/index.ts` and provider.
  Firebase Auth remains in-use.

Environment variables:
- Please set `MONGO_URI` in your environment or `.env.local`:

  MONGO_URI=mongodb+srv://shinukrathod0143_db_user:dLwVO7Q2qOXXMCEy@phishweb.ifegvvt.mongodb.net/

Notes and next steps:

- Dependency install:
  - Run `npm install` to add `mongoose` and install dependencies.
- TypeScript and types:
  - The workspace may require `@types/node` and other dev deps; run `npm run typecheck`.
- Realtime listeners:
  - Firestore onSnapshot was replaced with polling. For production realtime, consider:
    - Implementing WebSocket or Server-Sent Events (SSE) endpoints.
    - Using change streams on MongoDB Atlas with an eventing layer.
- Security & auth:
  - Firebase Authentication is still used; ensure server endpoints validate the Firebase ID token for sensitive ops.
    - Add middleware to verify the token using `firebase-admin` or `getAuth().verifyIdToken` on server.
- Further improvements:
  - Centralize API error handling.
  - Add indexes and more schemas for other collections if needed.
  - Add unit/integration tests for API routes and models.

If you'd like, I can:
- Run `npm install` and `npm run build` here and fix any resulting issues.
- Add token verification middleware to protect API routes.
- Implement real-time updates via SSE or WebSockets backed by MongoDB change streams.

If you want me to proceed with installing dependencies and running the build, say "Run install and build" and I'll execute the commands.
