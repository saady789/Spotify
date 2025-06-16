# 1. Use official Node.js base image
FROM node:16-alpine

# 2. Set working directory
WORKDIR /spotify

# 3. Copy only package files for caching
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the app
COPY . .

# 6. Generate Prisma client (needs schema.prisma to exist)
RUN npx prisma generate

# 7. Build Next.js app (needs Prisma client already generated)
RUN npm run build

# 8. Expose the port the app runs on
EXPOSE 3000

# 9. Start the app
CMD ["npm", "run", "start"]
