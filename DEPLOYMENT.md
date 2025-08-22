<<<<<<< HEAD
# DealHub CRM - Deployment Guide

This is a full-stack CRM application optimized for deployment on a VPS server with SQLite database.
=======
# Deployment Guide - Dockerless Production Setup

This is a full-stack CRM application designed for production deployment without Docker containers.
>>>>>>> refs/remotes/origin/main

## Project Structure

```
├── client/           # React Frontend (Vite + TypeScript)
├── server/           # Express Backend API
├── shared/           # Shared types and utilities
├── prisma/           # Database schema and migrations (SQLite)
<<<<<<< HEAD
├── data/             # SQLite database files
├── deploy.sh         # Production deployment script
├── setup-server.sh   # Server environment setup
└── init-db.sh        # Database initialization
=======
└── PRODUCTION_DEPLOYMENT.md # Complete deployment guide
>>>>>>> refs/remotes/origin/main
```

## Quick Start

<<<<<<< HEAD
### Local Development
=======
### Development
>>>>>>> refs/remotes/origin/main

```bash
# Install dependencies
npm install

<<<<<<< HEAD
# Initialize database
npm run init:db

# Development mode
npm run dev        # Starts both frontend and backend
```

### Production Deployment

```bash
# 1. Set up server environment (run once)
sudo bash setup-server.sh

# 2. Deploy application
npm run deploy
=======
# Setup database and generate Prisma client
npm run setup

# Start development servers
npm run dev        # Starts both frontend (port 8080) and backend (port 3001)
```

### Production

```bash
# Build the application
npm run build      # Build both frontend and backend

# Start production server
npm run start      # Start production server on port 3000
>>>>>>> refs/remotes/origin/main
```

## Environment Variables

The application uses these environment variables:

```env
<<<<<<< HEAD
DATABASE_URL="file:./data/production.db"
NODE_ENV=production
PORT=3000
JWT_SECRET="your-jwt-secret-key"
DOMAIN="https://dealhub.yitrobc.net"
```

## Frontend (Built to dist/spa)
=======
NODE_ENV=production
PORT=3000
DATABASE_URL="file:./database.db"
JWT_SECRET=your-super-secure-jwt-secret-key-here
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-email-password
```

## Frontend (Port 8080 in dev, served by backend in production)
>>>>>>> refs/remotes/origin/main

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Radix UI
- **State Management**: React Query + Context
- **Location**: `./client/`

<<<<<<< HEAD
## Backend (Port 3000)
=======
## Backend (Port 3001 in dev, 3000 in production)
>>>>>>> refs/remotes/origin/main

- **Framework**: Express.js + TypeScript
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT + bcrypt
- **Location**: `./server/`

<<<<<<< HEAD
## Server Requirements

- **OS**: Ubuntu 20.04+ or similar Linux distribution
- **Node.js**: Version 18.x or higher
- **Memory**: Minimum 1GB RAM
- **Storage**: At least 5GB available space
- **Domain**: Configured to point to server IP

## Production Setup

### 1. Server Preparation (root@216.48.190.58)

```bash
# Download and run server setup script
wget https://your-repo/setup-server.sh
chmod +x setup-server.sh
sudo ./setup-server.sh
=======
## Production Deployment

For complete step-by-step deployment instructions to your custom domain:

**📖 [See PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)**

This guide covers:

- Server setup and Node.js installation
- Application deployment and configuration
- PM2 process management
- Nginx reverse proxy setup
- SSL certificate configuration
- Firewall and security setup
- Monitoring and maintenance

## Deployment Options

### 1. Standard Server Deployment (Recommended)

Deploy directly to your server with Node.js:

```bash
# Automated deployment
sudo ./deploy-production.sh

# Manual deployment - see PRODUCTION_DEPLOYMENT.md
>>>>>>> refs/remotes/origin/main
```

This script will:

<<<<<<< HEAD
- Install Node.js 18.x
- Install PM2 for process management
- Install and configure Nginx
- Set up SSL certificates with Let's Encrypt
- Configure firewall rules
- Create application directories
=======
- **Heroku**: Use `package.json` scripts with Heroku Node.js buildpack
- **Railway**: Connect Git repo, auto-deploys with zero configuration
- **DigitalOcean App Platform**: Deploy directly from repository
- **Netlify**: Static frontend with serverless functions
>>>>>>> refs/remotes/origin/main

### 2. Application Deployment

```bash
# Clone your repository
git clone https://your-repo.git /var/www/dealhub
cd /var/www/dealhub

<<<<<<< HEAD
# Deploy the application
npm run deploy
```

The deployment script will:

- Install production dependencies
- Build the application
- Set up SQLite database
- Configure PM2 process manager
- Start the application

### 3. Nginx Configuration

The setup script automatically configures Nginx with:

- SSL termination
- Reverse proxy to Node.js application
- Security headers
- Gzip compression
- Static file serving

## Database Management

### SQLite Database

The application uses SQLite for simplicity and performance:

```bash
# Initialize database
npm run init:db

# Run migrations
npx prisma migrate deploy

# Seed test data
npm run db:seed

# Reset database
rm -f ./data/production.db && npm run init:db
```

### Database Location

- **Development**: `./data/dev.db`
- **Production**: `/var/www/dealhub/data/production.db`

## Process Management

The application runs under PM2 for reliability:

```bash
# Check status
pm2 list

# View logs
pm2 logs dealhub-crm

# Restart application
pm2 restart dealhub-crm

# Monitor performance
pm2 monit
```

## SSL Certificate

SSL certificates are automatically managed by Let's Encrypt:

```bash
# Check certificate status
sudo certbot certificates

# Renew certificates manually
sudo certbot renew

# Auto-renewal is configured via cron
```
=======
### 4. Cloud Virtual Machines

- **AWS EC2**: Standard Node.js deployment on Ubuntu/Amazon Linux
- **Google Cloud Compute**: VM instances with application setup
- **Azure Virtual Machines**: Windows or Linux VMs
>>>>>>> refs/remotes/origin/main

## Build Commands

```bash
# Frontend only
npm run build:client

# Backend only
npm run build:server

# Both (production)
npm run build

<<<<<<< HEAD
# Database setup
npm run init:db

# Start production server
npm run start:production
=======
# Test production build locally
npm run serve
>>>>>>> refs/remotes/origin/main
```

## Monitoring and Logs

### Application Logs

```bash
<<<<<<< HEAD
# PM2 logs
pm2 logs dealhub-crm

# System logs
tail -f /var/log/dealhub/combined.log
```

### System Monitoring

```bash
# Check application status
pm2 list

# Monitor system resources
htop

# Check Nginx status
sudo systemctl status nginx
=======
npm run dev          # Full-stack development
npm run dev:server   # Backend only
npm run test         # Run tests
npm run typecheck    # TypeScript checking
npm run format.fix   # Code formatting
npm run setup        # Initial setup (install + generate + migrate)
npm run migrate      # Database migrations
npm run db:seed      # Seed test data
>>>>>>> refs/remotes/origin/main
```

## Health Checks

<<<<<<< HEAD
- **Application**: `https://dealhub.yitrobc.net/api/ping`
- **Database**: SQLite file accessibility
- **SSL**: Certificate validity

## Backup and Recovery

### Database Backup

```bash
# Create backup
cp /var/www/dealhub/data/production.db /var/backups/dealhub-$(date +%Y%m%d).db

# Restore backup
cp /var/backups/dealhub-YYYYMMDD.db /var/www/dealhub/data/production.db
pm2 restart dealhub-crm
```

### Application Backup

```bash
# Full application backup
tar -czf /var/backups/dealhub-app-$(date +%Y%m%d).tar.gz -C /var/www dealhub
=======
- **API Health**: `GET /api/ping`
- **Frontend**: Check application accessibility
- **Database**: SQLite file existence and Prisma connection

## Database Management

```bash
# Create backup
cp database.db "backup-$(date +%Y%m%d).db"

# Run migrations
npx prisma migrate deploy

# Reset database (CAUTION!)
rm database.db && npx prisma migrate deploy

# Seed test data
npm run db:seed
>>>>>>> refs/remotes/origin/main
```

## Troubleshooting

<<<<<<< HEAD
### Common Issues

1. **Application won't start**

   ```bash
   # Check PM2 logs
   pm2 logs dealhub-crm

   # Check database permissions
   ls -la /var/www/dealhub/data/
   ```

2. **Database connection errors**

   ```bash
   # Verify database file exists
   ls -la ./data/production.db

   # Reinitialize database
   npm run init:db
   ```

3. **SSL certificate issues**

   ```bash
   # Check certificate status
   sudo certbot certificates

   # Renew certificate
   sudo certbot renew --nginx
   ```

4. **Nginx configuration**

   ```bash
   # Test configuration
   sudo nginx -t

   # Reload configuration
   sudo systemctl reload nginx
   ```

## Security Considerations

- SSL/TLS encryption enabled
- Security headers configured
- Firewall rules in place
- Regular security updates recommended
- Database file permissions restricted
- JWT tokens with secure secrets

## Performance Optimization

- Gzip compression enabled
- Static file caching
- PM2 cluster mode available
- Database indexes optimized
- Nginx reverse proxy caching

For support, contact the development team or refer to the application logs.
=======
1. **Port conflicts**: Change PORT environment variable
2. **Database issues**: Check SQLite file permissions and location
3. **Build failures**: Ensure all dependencies in package.json are installed
4. **Permission errors**: Check file ownership and execute permissions

## Monitoring

### Log Locations (when deployed with PM2)

- **Application**: `/var/log/dealhub-crm/`
- **PM2**: `pm2 logs dealhub-crm`
- **System**: `journalctl -u nginx`

### Management Commands

```bash
# Application status
pm2 status
pm2 logs dealhub-crm
pm2 restart dealhub-crm

# Database backup
cp /var/www/dealhub-crm/database.db "/backups/db-$(date +%Y%m%d).db"
```

## Security Features

- JWT authentication with secure token handling
- bcrypt password hashing
- Input validation and sanitization
- CORS protection
- Security headers (when using Nginx)
- SQLite database (no network exposure)

For complete production deployment with SSL, domain setup, and security configuration, see:

**📖 [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)**

---

_This deployment guide focuses on production-ready, dockerless deployment suitable for professional CRM use._
>>>>>>> refs/remotes/origin/main
