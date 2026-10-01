# ==============================================================================
# Multi-Stage Production Dockerfile for SMPN 5 Cibeber Web Profil (Next.js 16)
# Optimized for Coolify Deployment (Lightweight Standalone Runner ~120MB)
# ==============================================================================

# Stage 1: Base Alpine Image
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Stage 2: Install dependencies based on the preferred package manager
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for build phase
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Supabase Build Args (Optional defaults from project)
ARG NEXT_PUBLIC_SUPABASE_URL=https://bgyeqdyguuflljgzilzy.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJneWVxZHlndXVmbGxqZ3ppbHp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MjU1MTgsImV4cCI6MjEwNjAwMTUxOH0.P-inKoVotxDNXITp-aaYGpmXq0BCEsbPtwlJ4yHrZc8
ARG NEXT_PUBLIC_ADMIN_PORTAL_URL=https://ekosistem.daeroom.my.id

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_ADMIN_PORTAL_URL=$NEXT_PUBLIC_ADMIN_PORTAL_URL

RUN npm run build

# Stage 4: Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Non-root user security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets and standalone server output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
