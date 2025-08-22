# Deployment Guide - Dockerless Production Setup

This is a full-stack CRM application designed for production deployment without Docker containers.

## Project Structure

```
├── client/           # React Frontend (Vite + TypeScript)
├── server/           # Express Backend API
├── shared/           # Shared types and utilities
├── prisma/           # Database schema and migrations (SQLite)
└── PRODUCTION_DEPLOYMENT.md # Complete deployment guide
```

## Quick Start

### Development

```bash
# Install dependencies
npm install

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
```

## Environment Variables

Create a `.env` file:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL="file:./database.db"
JWT_SECRET=your-super-secure-jwt-secret-key-here
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-email-password
```

## Frontend (Port 8080 in dev, served by backend in production)

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Radix UI
- **State Management**: React Query + Context
- **Location**: `./client/`

## Backend (Port 3001 in dev, 3000 in production)

- **Framework**: Express.js + TypeScript
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT + bcrypt
- **Email**: Nodemailer
- **Location**: `./server/`

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
```

### 2. Platform-as-a-Service

- **Heroku**: Use `package.json` scripts with Heroku Node.js buildpack
- **Railway**: Connect Git repo, auto-deploys with zero configuration
- **DigitalOcean App Platform**: Deploy directly from repository
- **Netlify**: Static frontend with serverless functions

### 3. Static Frontend + Serverless Backend

- **Frontend**: Deploy `dist/spa` to Netlify/Vercel/Cloudflare
- **Backend**: Deploy as serverless functions (see `netlify/functions/`)

### 4. Cloud Virtual Machines

- **AWS EC2**: Standard Node.js deployment on Ubuntu/Amazon Linux
- **Google Cloud Compute**: VM instances with application setup
- **Azure Virtual Machines**: Windows or Linux VMs

## Build Commands

```bash
# Frontend only
npm run build:client

# Backend only
npm run build:server

# Both (production)
npm run build

# Test production build locally
npm run serve
```

## Development Scripts

```bash
npm run dev          # Full-stack development
npm run dev:server   # Backend only
npm run test         # Run tests
npm run typecheck    # TypeScript checking
npm run format.fix   # Code formatting
npm run setup        # Initial setup (install + generate + migrate)
npm run migrate      # Database migrations
npm run db:seed      # Seed test data
```

## Health Checks

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
```

## Troubleshooting

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
