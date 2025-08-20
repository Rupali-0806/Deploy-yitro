# 🚀 Deploy CRM to dealhub.yitrobc.net

## Server Details

- **Domain**: https://dealhub.yitrobc.net/
- **Server**: 216.48.184.73
- **Login**: `ssh root@216.48.184.73`
- **Password**: `ABZUZG@ywgdb581`

## Deployment Steps

### Step 1: Build and Package

Run these commands in your local terminal:

```bash
# Make scripts executable
chmod +x deploy.sh deploy-server.sh

# Build Docker image
docker build -t dealhub-crm:latest .

# Save Docker image
docker save dealhub-crm:latest > dealhub-crm.tar

# Create deployment package
tar -czf deployment.tar.gz \
    dealhub-crm.tar \
    docker-compose.prod.yml \
    .env.prod \
    nginx.conf \
    deploy-server.sh
```

### Step 2: Upload to Server

```bash
# Upload deployment package
scp deployment.tar.gz root@216.48.184.73:/tmp/
```

### Step 3: Deploy on Server

```bash
# SSH to server
ssh root@216.48.184.73
# Password: ABZUZG@ywgdb581

# On the server, run:
cd /tmp
tar -xzf deployment.tar.gz

# Create directories
mkdir -p /opt/dealhub-crm
mkdir -p /opt/backups

# Move files
mv docker-compose.prod.yml /opt/dealhub-crm/
mv nginx.conf /opt/dealhub-crm/
mv .env.prod /opt/dealhub-crm/.env

# Load Docker image
docker load < dealhub-crm.tar

# Start application
cd /opt/dealhub-crm
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# Run database migrations
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

### Step 4: Verify Deployment

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs -f app

# Test the application
curl http://localhost:3000/api/ping
```

## Access Your Application

- **URL**: https://dealhub.yitrobc.net
- **Admin Login**: admin@yitro.com / admin123
- **User Login**: user@yitro.com / user123

## Environment Configuration

Your production environment is pre-configured with:

- ✅ Secure database password
- ✅ Strong JWT secret
- ✅ Production-ready settings
- ✅ Nginx reverse proxy
- ✅ PostgreSQL database

## Troubleshooting

If you encounter issues:

```bash
# View all logs
docker-compose -f docker-compose.prod.yml logs

# Restart services
docker-compose -f docker-compose.prod.yml restart

# Check database
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -d dealhub_crm
```

## SSL Setup (Optional)

To enable HTTPS with SSL certificates:

1. Obtain SSL certificates for dealhub.yitrobc.net
2. Place them in `/opt/dealhub-crm/ssl/`
3. Uncomment SSL lines in nginx.conf
4. Restart nginx

## Quick Deploy Option

Alternatively, you can use the automated script:

```bash
./deploy.sh
```

This will do all the steps above automatically.
