FROM golang:1.22-alpine AS builder

WORKDIR /app

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy source code and build
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# Final minimal image
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/server .
COPY .env.example .env

EXPOSE 8080

CMD ["./server"]
