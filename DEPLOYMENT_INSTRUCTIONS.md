# Deployment Instructions for dealhub.yitrobc.net

## Server Details
- **Host**: 216.48.184.73
- **User**: root
- **Domain**: https://dealhub.yitrobc.net

## Quick Deployment Steps

### 1. Make deployment script executable
```bash
chmod +x deploy.sh deploy-server.sh
```

### 2. Deploy to server
```bash
./deploy.sh
```

## Manual Deployment (if script fails)

### 1. Build and save Docker image
```bash
docker build -t dealhub-crm:latest .
docker save dealhub-crm:latest > dealhub-crm.tar
```

### 2. Create deployment package
```bash
tar -czf deployment.tar.gz \
    dealhub-crm.tar \
    docker-compose.prod.yml \
    .env.prod \
    nginx.conf \
    deploy-server.sh
```

### 3. Upload to server
```bash
scp deployment.tar.gz root@216.48.184.73:/tmp/
```

### 4. SSH to server and deploy
```bash
ssh root@216.48.184.73

# On the server:
cd /tmp
tar -xzf deployment.tar.gz

# Create app directory
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
```

### 5. Run database migrations
```bash
cd /opt/dealhub-crm
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

## Post-Deployment

### Check if everything is running
```bash
ssh root@216.48.184.73
cd /opt/dealhub-crm
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f app
```

### Access the application
- **URL**: http://216.48.184.73:3000 (initially HTTP)
- **Domain**: https://dealhub.yitrobc.net (after DNS setup)

### Test accounts (if using in-memory auth)
- **Admin**: admin@yitro.com / admin123
- **User**: user@yitro.com / user123

## Troubleshooting

### View logs
```bash
docker-compose -f docker-compose.prod.yml logs -f
```

### Restart services
```bash
docker-compose -f docker-compose.prod.yml restart
```

### Check database
```bash
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -d dealhub_crm
```

## SSL Setup (Optional)

To enable HTTPS:
1. Get SSL certificates for dealhub.yitrobc.net
2. Place certificates in `/opt/dealhub-crm/ssl/`
3. Uncomment SSL lines in nginx.conf
4. Restart nginx: `docker-compose -f docker-compose.prod.yml restart nginx`

## DNS Configuration

Point your domain dealhub.yitrobc.net to 216.48.184.73:
- A record: dealhub.yitrobc.net → 216.48.184.73
- CNAME record: www.dealhub.yitrobc.net → dealhub.yitrobc.net
