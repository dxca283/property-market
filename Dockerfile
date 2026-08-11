# ======================
# Stage 1: Install dependencies
# ======================

FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ======================
# Stage 2: Build
# ======================

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN --mount=type=secret,id=env,target=/app/.env \
    npm run build
RUN npm prune --production

# ======================
# Stage 3: Production
# ======================
FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]