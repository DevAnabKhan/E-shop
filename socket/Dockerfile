# Multi-stage build for Socket.IO
# STAGE 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# STAGE 2: Production 
# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy node_modules and app from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app . .

# Expose port (default 4000)
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start Socket.IO server
CMD ["npm", "start"]
