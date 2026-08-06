FROM node:18-bullseye-slim

# Install Python 3 and build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Setup Python Virtual Environment
ENV VIRTUAL_ENV=/app/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Copy package files and install Node modules
COPY package*.json ./
RUN npm install --production

# Copy Python requirements and install
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY . .

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Start the Node.js server
CMD ["node", "server.js"]
