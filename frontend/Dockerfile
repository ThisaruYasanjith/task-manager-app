# Step 1: Build stage
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Step 3: Production stage (using Nginx)
FROM nginx:alpine
# Adjust 'frontend/browser' to match your actual dist output folder name
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]