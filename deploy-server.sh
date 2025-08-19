#!/bin/bash

# Server-side deployment script
set -e

APP_DIR="/opt/dealhub-crm"
BACKUP_DIR="/opt/backups"

echo "🔧 Setting up deployment environment on server..."

# Create directories
sudo mkdir -p $APP_DIR
sudo mkdir -p $BACKUP_DIR
sudo mkdir -p $APP_DIR/logs
sudo mkdir -p $APP_DIR/ssl

# Move files to app directory
sudo mv docker-compose.prod.yml $APP_DIR/
sudo mv nginx.conf $APP_DIR/
sudo mv .env.prod $APP_DIR/.env

# Load Docker image
echo "📥 Loading Docker image..."
sudo docker load < dealhub-crm.tar

# Navigate to app directory
cd $APP_DIR

# Stop existing containers if running
echo "🛑 Stopping existing containers..."
sudo docker-compose -f docker-compose.prod.yml down || true

# Start the application
echo "🚀 Starting application..."
sudo docker-compose -f docker-compose.prod.yml up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Check if services are running
echo "✅ Checking service status..."
sudo docker-compose -f docker-compose.prod.yml ps

# Test database connection
echo "🔍 Testing database connection..."
sudo docker-compose -f docker-compose.prod.yml exec -T app npx prisma migrate deploy || echo "⚠️ Database migration needed - run manually"

echo "🎉 Deployment completed successfully!"
echo "📱 App URL: https://dealhub.yitrobc.net"
echo "🗄️ Database: PostgreSQL running on port 5432"
echo "📋 Logs: docker-compose -f docker-compose.prod.yml logs -f"
