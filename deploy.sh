#!/bin/bash

# Deployment script for dealhub.yitrobc.net
set -e

echo "🚀 Deploying CRM App to dealhub.yitrobc.net"
echo "============================================"

# Configuration
SERVER_HOST="216.48.184.73"
SERVER_USER="root"
APP_DIR="/opt/dealhub-crm"
BACKUP_DIR="/opt/backups"

echo "📦 Building production Docker image..."
docker build -t dealhub-crm:latest .

echo "💾 Saving Docker image to tar file..."
docker save dealhub-crm:latest > dealhub-crm.tar

echo "📤 Copying files to server..."
# Create deployment package
tar -czf deployment.tar.gz \
    dealhub-crm.tar \
    docker-compose.prod.yml \
    .env.prod \
    nginx.conf \
    deploy-server.sh

echo "🔐 Uploading to server..."
scp deployment.tar.gz ${SERVER_USER}@${SERVER_HOST}:/tmp/

echo "🚀 Executing deployment on server..."
ssh ${SERVER_USER}@${SERVER_HOST} << 'EOF'
    cd /tmp
    tar -xzf deployment.tar.gz
    chmod +x deploy-server.sh
    ./deploy-server.sh
EOF

echo "🧹 Cleaning up local files..."
rm -f dealhub-crm.tar deployment.tar.gz

echo "✅ Deployment completed!"
echo "🌐 Your app should be available at: https://dealhub.yitrobc.net"
echo "📊 Check status: ssh root@216.48.184.73 'cd /opt/dealhub-crm && docker-compose -f docker-compose.prod.yml ps'"
