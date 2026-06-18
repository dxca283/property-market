<!-- BEGIN:nextjs-agent-rules -->
# Next.js Agent Rules

## Important
This project uses a modern Next.js version that may differ from your training data.

Before implementing framework-specific features:
- Check official Next.js documentation when uncertain.
- Read relevant guides in `node_modules/next/dist/docs/` if available.
- Follow existing project patterns before introducing new ones.
- Respect deprecation warnings and migration notices.

---

# Main Rule

- Make the smallest possible change.
- Do not rewrite unrelated code.
- Do not scan the entire project unless required.
- Only inspect files needed for the current task.
- Preserve existing behavior.
- Keep responses concise.
- Mention only changed files and what changed.

---

# Editing Rules

- Do not output full files unless requested.
- Prefer targeted edits over large rewrites.
- Do not reformat working code unnecessarily.
- Do not add abstractions without clear benefit.
- Do not create duplicate implementations.
- Do not install new dependencies unless required.
- Do not modify generated files.
- Do not change environment configuration unless asked.

---

# Code Style

- Write clean, simple, production-ready code.
- Use TypeScript properly.
- Prefer explicit types when helpful.
- Avoid `any` unless there is no practical alternative.
- Follow existing naming conventions.
- Follow existing folder structure.
- Reuse existing utilities, hooks, components, and styles.
- Keep code consistent with surrounding files.

---

# Component Rules

- Create small, focused components.
- Keep pages focused on layout and composition.
- Move reusable UI into components.
- Move business logic into hooks, services, server actions, or utilities.
- Avoid large JSX blocks.
- Avoid deep nesting.
- Keep components single-responsibility.

---

# Next.js Rules

- Use Server Components by default.
- Use `"use client"` only when necessary.
- Use Client Components only for:
  - state
  - effects
  - browser APIs
  - user interactions

- Prefer:
  - Server Actions
  - Route Handlers
  - Server Components

for backend logic.

- Validate input before database operations.
- Handle loading, error, and empty states when appropriate.
- Never expose secrets to the client.

---

# UI Rules

- Reuse existing design system components first.
- Keep UI minimal, clean, and responsive.
- Avoid one-off styling.
- Respect existing spacing, typography, and colors.
- Do not redesign screens unless requested.

---

# Database Rules

- Do not change schema unless explicitly requested.
- Reuse existing database clients.
- Verify authenticated users before accessing private data.
- Always associate user-owned data with user IDs.
- Avoid duplicate records.
- Store only necessary data.

---

# Workflow

Before coding:
1. Identify the minimum files required.
2. Check existing implementations first.
3. Choose the smallest safe change.

After coding:
1. Run relevant type checks if available.
2. Run relevant tests if available.
3. Summarize changed files only.

---

# Response Format

When finished:

Changed Files:
- path/to/file.ts
  - short description of change

Validation:
- Type check: Passed / Not Run
- Tests: Passed / Not Run
```
<!-- END:nextjs-agent-rules -->