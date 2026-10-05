#!/usr/bin/env bash

# Contango Quant — VPS Cloud Deploy Orchestrator (Option 3)
# Automates Docker provisioning, Nginx reverse proxy mappings, and Certbot SSL configuration.

if [ "$EUID" -ne 0 ]; then
  echo "❌ Please run as root (sudo ./deploy_vps.sh)"
  exit 1
fi

DOMAIN=$1
if [ -z "$DOMAIN" ]; then
  echo "❓ Usage: ./deploy_vps.sh <your-domain.com>"
  exit 1
fi

echo "🚀 Initiating production cloud deployment for $DOMAIN..."

# 1. Update OS package indexes
echo "📦 Updating system packages..."
apt-get update -y && apt-get upgrade -y

# 2. Install Docker & Docker Compose if missing
if ! [ -x "$(command -v docker)" ]; then
  echo "🐳 Installing Docker Engine..."
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
fi

# 3. Install Nginx & Certbot if missing
echo "🌐 Installing Nginx and Certbot for SSL termination..."
apt-get install -y nginx certbot python3-certbot-nginx

# 4. Generate SSL Certificates via Let's Encrypt Certbot
echo "🔒 Requesting SSL Certificate for $DOMAIN..."
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN" --redirect

# 5. Create Nginx Proxy Mappings
echo "⚙️  Configuring Nginx Reverse Proxy Mappings..."
CATALOG_CONF="/etc/nginx/sites-available/contango"

cat > "$CATALOG_CONF" <<EOF
server {
    listen 80;
    server_name $DOMAIN;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # 1. React Web PWA Frontend
    location / {
        proxy_pass http://127.0.0.1:3050;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }

    # 2. Python FastAPI Gateway
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # 3. Go MIM Engine WebSockets & Simulator
    location /simulate {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
    }
}
EOF

ln -sf "$CATALOG_CONF" /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

# 6. Spin up Docker container services
echo "⚡ Starting Docker container orchestrator..."
docker compose -f docker-compose.prod.yml up -d --build

echo "🎉 Deployment completed successfully! Access your secure instance at: https://$DOMAIN"
