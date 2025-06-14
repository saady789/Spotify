# 1. Use official Node.js base image
FROM node:16-alpine

# 2. Set working directory
WORKDIR /spotify

# 3. Copy only package files first to leverage Docker layer caching
COPY package*.json ./

# 4. Install dependencies (will be cached if package.json hasn't changed)
RUN npm install

# 5. Copy the rest of the app (including prisma folder)
COPY . .

# 6. Generate Prisma client (schema.prisma is now present)
RUN npx prisma generate

# 7. Expose port
EXPOSE 3000

# 8. Start app
CMD ["npm", "run", "dev"]
