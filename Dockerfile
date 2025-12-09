# Infinite Nexus ScrollVerse - Dockerfile
# Multi-stage build for optimized production deployment

# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Stage 2: Production stage
FROM node:20-alpine

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Create app directory
WORKDIR /app

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/config ./config
COPY --from=builder /app/database ./database
COPY --from=builder /app/*.js ./
COPY --from=builder /app/*.html ./
COPY --from=builder /app/assets ./assets
COPY --from=builder /app/data ./data

# Create non-root user
RUN addgroup -g 1001 -S scrollverse && \
    adduser -S scrollverse -u 1001 && \
    chown -R scrollverse:scrollverse /app

# Switch to non-root user
USER scrollverse

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Start application
CMD ["npm", "start"]
