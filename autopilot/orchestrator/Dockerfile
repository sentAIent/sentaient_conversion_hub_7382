FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Run the crawler logic
CMD ["node", "crawler.js"]
