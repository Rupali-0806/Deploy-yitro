<<<<<<< HEAD
# DealHub CRM Platform

A comprehensive Customer Relationship Management system built with React, Express.js, and SQLite, optimized for deployment on `dealhub.yitrobc.net`.

## 🚀 Features

- **Complete CRM Functionality**: Manage contacts, accounts, deals, and activities
- **User Profile Management**: Role-based access control
- **Real-time Dashboard**: Metrics and analytics
- **Professional Reports**: Export and analysis tools
- **Dark/Light Mode**: Modern UI with theme switching
- **Responsive Design**: Mobile-friendly interface
- **SQLite Database**: Lightweight and efficient data storage

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Radix UI
- **Backend**: Express.js, TypeScript, Prisma ORM
- **Database**: SQLite
- **Authentication**: JWT + bcrypt
- **Deployment**: PM2, Nginx, Let's Encrypt SSL

## 📋 Quick Start

### Local Development

```bash
# Clone repository
git clone <repository-url>
cd dealhub-crm

# Install dependencies
npm install

# Initialize database
npm run init:db

# Start development server
npm run dev
```

Access the application at `http://localhost:8080`

### Production Deployment

#### Server Setup (Run once on root@216.48.190.58)

```bash
# Download and run server setup
wget <repository-url>/setup-server.sh
chmod +x setup-server.sh
sudo ./setup-server.sh
```

#### Application Deployment

```bash
# Clone to production directory
git clone <repository-url> /var/www/dealhub
cd /var/www/dealhub

# Deploy application
npm run deploy
```

The application will be available at `https://dealhub.yitrobc.net`

## 📁 Project Structure

```
dealhub-crm/
├── client/              # React frontend application
│   ├── components/      # Reusable UI components
│   ├── pages/          # Application pages
│   ├── services/       # API services
│   └── hooks/          # Custom React hooks
├── server/             # Express.js backend
│   ├── routes/         # API route handlers
│   ├── lib/            # Utility libraries
│   └── db/             # Database utilities
├── shared/             # Shared types and models
├── prisma/             # Database schema and migrations
├── data/               # SQLite database files
├── deploy.sh           # Production deployment script
├── setup-server.sh     # Server environment setup
└── init-db.sh          # Database initialization
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:server       # Start backend only

# Building
npm run build            # Build both frontend and backend
npm run build:client     # Build frontend only
npm run build:server     # Build backend only

# Production
npm run start            # Start production server
npm run start:production # Start with production environment

# Database
npm run init:db          # Initialize SQLite database
npm run migrate          # Run database migrations
npm run db:seed          # Seed database with test data

# Deployment
npm run deploy           # Deploy to production
npm run setup:server     # Setup server environment

# Testing & Quality
npm run test             # Run tests
npm run typecheck        # TypeScript type checking
npm run format.fix       # Fix code formatting
```

## 🗄️ Database Management

The application uses SQLite for data storage:

```bash
# Initialize database
npm run init:db

# Run migrations
npx prisma migrate deploy

# View database
npx prisma studio

# Reset database
rm -f ./data/production.db && npm run init:db
```

## 🔐 Environment Configuration

Create a `.env` file for local development:

```env
DATABASE_URL="file:./data/production.db"
NODE_ENV=production
PORT=3000
JWT_SECRET="your-secure-jwt-secret"
DOMAIN="https://dealhub.yitrobc.net"
```

## 🌐 Production Environment

### Server Specifications

- **Server**: root@216.48.190.58
- **Domain**: https://dealhub.yitrobc.net
- **OS**: Ubuntu 20.04+
- **Node.js**: 18.x
- **Process Manager**: PM2
- **Web Server**: Nginx
- **SSL**: Let's Encrypt

### Monitoring

```bash
# Check application status
pm2 list

# View logs
pm2 logs dealhub-crm

# Monitor performance
pm2 monit

# Check Nginx status
sudo systemctl status nginx
```

## 🔒 Security Features

- SSL/TLS encryption with Let's Encrypt
- Security headers configuration
- JWT-based authentication
- Firewall configuration
- Secure database file permissions
- Regular security updates

## 📊 Performance

- Nginx reverse proxy with caching
- Gzip compression enabled
- Static file optimization
- PM2 cluster mode ready
- Optimized database queries

## 🐛 Troubleshooting

### Common Issues

1. **Application won't start**

   ```bash
   pm2 logs dealhub-crm
   npm run init:db
   ```

2. **Database errors**

   ```bash
   ls -la ./data/
   npx prisma migrate deploy
   ```

3. **SSL certificate issues**
   ```bash
   sudo certbot certificates
   sudo certbot renew
   ```

### Log Files

- Application logs: `/var/log/dealhub/`
- Nginx logs: `/var/log/nginx/`
- PM2 logs: `~/.pm2/logs/`

## 📝 API Documentation

The API is available at `https://dealhub.yitrobc.net/api/` with the following endpoints:

- `GET /api/contacts` - List contacts
- `GET /api/accounts` - List accounts
- `GET /api/deals` - List deals
- `GET /api/activities` - List activities
- `GET /api/leads` - List leads
- `POST /api/auth/signin` - User authentication
=======
# Yitro CRM Platform 🚀

A modern, full-stack Customer Relationship Management (CRM) platform built with React, TypeScript, Node.js, and SQLite. Designed for professional business use with a focus on performance, security, and user experience.

## ✨ Features

### 🎯 Core CRM Functionality

- **Contact Management**: Complete contact lifecycle management
- **Account Management**: Company and organization tracking
- **Deal Pipeline**: Sales opportunity management
- **Activity Logging**: Communication and interaction tracking
- **Lead Management**: Lead generation and qualification
- **Reporting**: Professional report generation and analytics

### 🔧 Technical Features

- **Modern React Frontend**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark/Light Mode**: Automatic theme switching with system preference
- **Real-time Updates**: Live dashboard metrics and notifications
- **Professional UI**: Radix UI components with polished design
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **SQLite Database**: Lightweight, serverless database with Prisma ORM
- **JWT Authentication**: Secure user authentication and authorization
- **Express.js API**: RESTful API with comprehensive error handling

## 🏗️ Architecture

```
├── client/           # React Frontend (Vite + TypeScript)
│   ├── components/   # Reusable UI components
│   ├── pages/        # Application pages/routes
│   ├── contexts/     # React context providers
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API service layer
│   └── lib/          # Utility functions
├── server/           # Express Backend API
│   ├── routes/       # API route handlers
│   ├── db/           # Database utilities and setup
│   ├── lib/          # Server utilities
│   └── scripts/      # Maintenance scripts
├── shared/           # Shared types and utilities
├── prisma/           # Database schema and migrations
└── public/           # Static assets
```

## 🚀 Quick Start

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-repo/yitro-crm.git
cd yitro-crm

# Install dependencies
npm install

# Setup database
npm run setup

# Start development servers
npm run dev        # Starts both frontend (port 8080) and backend (port 3001)
```

### Production Deployment

For production deployment to your custom domain, see the comprehensive guide:

**📖 [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)**

### Build Commands

```bash
# Development
npm run dev          # Start development servers
npm run dev:server   # Start backend only

# Building
npm run build        # Build both frontend and backend
npm run build:client # Build frontend only
npm run build:server # Build backend only

# Production
npm run start        # Start production server
npm run serve        # Start production server with NODE_ENV=production

# Database
npm run setup        # Install deps + generate Prisma + migrate
npm run migrate      # Run database migrations
npm run migrate:prod # Run production migrations
npm run db:seed      # Seed database with test data

# Testing & Quality
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run typecheck    # TypeScript type checking
npm run format.fix   # Format code with Prettier
npm run format:check # Check code formatting
```

## 📁 Project Structure Details

### Frontend (`/client`)

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI for accessible, customizable components
- **State Management**: React Query for server state, Context for client state
- **Routing**: React Router v6 for client-side routing

### Backend (`/server`)

- **Framework**: Express.js with TypeScript
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **Email**: Nodemailer for transactional emails
- **API Design**: RESTful endpoints with comprehensive error handling

### Database (`/prisma`)

- **ORM**: Prisma for type-safe database access
- **Database**: SQLite for development and production
- **Migrations**: Prisma migrate for schema versioning
- **Models**: Complete CRM data models (Contacts, Accounts, Deals, etc.)

## 🔐 Environment Configuration

Create a `.env` file in the root directory:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL="file:./database.db"
JWT_SECRET="your-super-secure-jwt-secret-key-here"
EMAIL_USER="your-email@domain.com"
EMAIL_PASS="your-email-password"
```

## 🗄️ Database Schema

The CRM includes comprehensive data models:

- **Contacts**: Individual people with full contact information
- **Accounts**: Companies and organizations
- **Activities**: Communication logs and interactions
- **Deals**: Sales opportunities and pipeline management
- **Leads**: Prospective customers and lead qualification
- **User Profiles**: User management and preferences

## 🔒 Authentication

- JWT-based authentication with secure token handling
- bcrypt password hashing for security
- Role-based access control (Admin, Sales Manager, Sales Rep, User)
- Session management with automatic token refresh

## 📊 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode (development)
npm run test:watch

# Type checking
npm run typecheck
npm run typecheck:server
```

## 🎨 UI/UX Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme switching with user preference
- **Professional Design**: Clean, modern interface suitable for business use
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Loading States**: Proper loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and recovery options

## 🚀 Deployment Options

### Production Server (Recommended)

- Standard Node.js deployment with PM2 process management
- Nginx reverse proxy for HTTPS and static file serving
- SQLite database for reliable, maintenance-free data storage
- See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) for complete instructions

### Platform-as-a-Service

- **Heroku**: Use the provided `package.json` scripts
- **Railway**: Connect Git repo for automatic deployments
- **DigitalOcean App Platform**: Direct deployment from repository
- **Netlify**: Static frontend with serverless backend functions

### Cloud Providers

- **AWS**: EC2 instances with Application Load Balancer
- **Google Cloud**: Compute Engine or App Engine
- **Azure**: App Service or Virtual Machines

## 📈 Performance

- **Frontend**: Vite for fast development and optimized production builds
- **Backend**: Express.js with efficient middleware and caching
- **Database**: SQLite with Prisma for optimized queries
- **Caching**: Built-in HTTP caching and static asset optimization
- **Compression**: Gzip compression for all text-based assets

## 🛠️ Development Tools

- **TypeScript**: Full type safety across the entire stack
- **ESLint**: Code linting with custom rules
- **Prettier**: Consistent code formatting
- **Vitest**: Fast unit and integration testing
- **Prisma Studio**: Database visual editor
- **React DevTools**: Component debugging and profiling

## 📝 API Documentation

The backend provides a comprehensive RESTful API:

- **Authentication**: `/api/auth/*` - Login, register, password reset
- **Contacts**: `/api/contacts/*` - CRUD operations for contacts
- **Accounts**: `/api/accounts/*` - Company management
- **Activities**: `/api/activities/*` - Communication logging
- **Deals**: `/api/deals/*` - Sales pipeline management
- **Leads**: `/api/leads/*` - Lead qualification and tracking
- **Reports**: `/api/reports/*` - Analytics and reporting
- **Profile**: `/api/profile/*` - User profile management
>>>>>>> refs/remotes/origin/main

## 🤝 Contributing

1. Fork the repository
<<<<<<< HEAD
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## 📄 License

This project is proprietary software for Yitro Business Consulting.

## 🆘 Support

For support and questions:

- Check the [Deployment Guide](./DEPLOYMENT.md)
- Review application logs
- Contact the development team

---

**DealHub CRM Platform** - Professional CRM solution for modern businesses.
=======
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For deployment assistance or technical support:

1. Check the [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) guide
2. Review the troubleshooting section in the deployment guide
3. Check application logs for specific error messages
4. Ensure all prerequisites are met (Node.js 20.x, proper permissions, etc.)

## 🎯 Production Ready

This CRM platform is designed for production use with:

- **Security**: JWT authentication, input validation, SQL injection protection
- **Scalability**: Efficient database queries, proper indexing, caching strategies
- **Reliability**: Error handling, logging, health checks, automated backups
- **Maintainability**: TypeScript, comprehensive tests, clear documentation
- **User Experience**: Professional UI, responsive design, accessibility compliance

---

**🌍 Deploy to your custom domain: https://dealhub.yitrobc.net/**

_Built with ❤️ for professional CRM needs_
>>>>>>> refs/remotes/origin/main
