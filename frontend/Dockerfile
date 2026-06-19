# # Build stage
# # FROM node:20-alpine AS builder

# # WORKDIR /app

# # # Copy package files
# # COPY package*.json ./

# # # Install dependencies
# # RUN npm install

# # # Copy source code
# # COPY . .

# # # Build the application with environment variables
# # ARG VITE_API_URL=https://e-shop-5v54.vercel.app/api/v2
# # ARG VITE_SOCKET_URL=https://e-shop-5v54.vercel.app

# # ENV VITE_API_URL=$VITE_API_URL
# # ENV VITE_SOCKET_URL=$VITE_SOCKET_URL

# # RUN npm run build

# # Production stage - Use Nginx to serve
# FROM nginx:alpine

# # Copy nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

# # Copy built application from builder
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Expose port (default 3001)
# EXPOSE 3001

# # Health check
# HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
#   CMD wget --quiet --tries=1 --spider http://localhost:3001/ || exit 1

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3001/ || exit 1

CMD ["nginx", "-g", "daemon off;"]