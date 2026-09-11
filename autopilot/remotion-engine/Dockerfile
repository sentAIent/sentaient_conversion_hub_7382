FROM node:18-bullseye-slim

WORKDIR /app

# Remotion requires certain system dependencies for Chromium to run
RUN apt-get update && apt-get install -y \
    libnss3 \
    libdbus-1-3 \
    libatk1.0-0 \
    libgbm1 \
    libasound2 \
    libxrandr2 \
    libxkbcommon-x11-0 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    fonts-liberation \
    libappindicator3-1 \
    xdg-utils \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 8007

CMD ["npm", "start"]
