FROM node:20-slim AS builder

WORKDIR /app
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

COPY package*.json ./
RUN npm ci

COPY . .

# Set up python venv for optimization script
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install pulp pandas requests

RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app

RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Copy python scripts
COPY --from=builder /app/src/lib/etl ./src/lib/etl

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
