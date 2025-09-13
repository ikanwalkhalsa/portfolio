# 🚀 Production Deployment Guide

This guide covers deploying your Next.js portfolio to production with comprehensive monitoring, security, and performance optimizations.

## 📋 Prerequisites

- Node.js 20+ and npm
- Docker and Docker Compose
- Domain name (optional but recommended)
- SSL certificate (Let's Encrypt recommended)

## 🛠️ Production Features

### ✅ Implemented Features

- **Performance Optimization**: Webpack optimization, code splitting, image optimization
- **Security**: Security headers, CSP, rate limiting, fail2ban
- **Monitoring**: Health checks, metrics endpoint, structured logging
- **Analytics**: Google Analytics, Hotjar, Vercel Analytics integration
- **Error Tracking**: Comprehensive error logging and monitoring
- **Caching**: Static asset caching, API response caching
- **SEO**: Meta tags, sitemap, robots.txt, OpenGraph
- **PWA**: Service worker, manifest.json, offline support

## 🐳 Docker Deployment

### Quick Start

```bash
# Build and deploy with Docker
./scripts/deploy.sh docker

# Or use Docker Compose
./scripts/deploy.sh compose
```

### Manual Docker Deployment

```bash
# Build Docker image
docker build -t kanwalpreet-portfolio:latest .

# Run container
docker run -d \
  --name portfolio-container \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_BASE_URL=https://your-domain.com \
  kanwalpreet-portfolio:latest
```

## 🌐 VPS/Server Deployment

### 1. Server Setup

```bash
# Run production setup script
sudo ./scripts/production-setup.sh full
```

### 2. Configure Domain

Update Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/kanwalpreet-portfolio
```

Replace `your-domain.com` with your actual domain.

### 3. SSL Setup

```bash
# Install SSL certificate
sudo certbot --nginx -d your-domain.com
```

### 4. Deploy Application

```bash
# Clone repository to production directory
sudo -u portfolio git clone https://github.com/yourusername/portfolio.git /opt/kanwalpreet-portfolio

# Install dependencies and build
cd /opt/kanwalpreet-portfolio
npm ci --only=production
npm run build

# Start service
sudo systemctl start kanwalpreet-portfolio.service
```

## ☁️ Vercel Deployment

### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 2. Environment Variables

Add the following environment variables in Vercel dashboard:

```bash
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_LEETCODE_USERNAME=kanwalpreetsingh
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
NEXT_PUBLIC_HOTJAR_ID=your-hotjar-id
```

### 3. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## 📊 Monitoring & Analytics

### Health Checks

```bash
# Check application health
curl https://your-domain.com/health

# View detailed metrics
curl https://your-domain.com/api/metrics
```

### Logs

```bash
# View application logs (Docker)
docker logs portfolio-container -f

# View systemd logs (VPS)
sudo journalctl -u kanwalpreet-portfolio.service -f

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
```

### Performance Monitoring

The application automatically tracks:
- **Core Web Vitals**: LCP, FID, CLS
- **Page Load Times**: Navigation timing
- **Resource Performance**: Slow loading resources
- **User Interactions**: Clicks, form submissions, scroll depth

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env.production` and configure:

```bash
# Application
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=1234567

# Security
NEXT_PUBLIC_SECURE_HEADERS=true
NEXT_PUBLIC_CSP_ENABLED=true

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_MONITORING=true
```

### Content Management

Update YAML files in `content/` directory:
- `hero.yml` - Hero section content
- `about.yml` - About page content
- `projects.yml` - Project listings
- `contact.yml` - Contact information
- `testimonials.yml` - Testimonials

## 🚀 Deployment Commands

### Development

```bash
# Start development server
npm run dev

# Start with auto-refresh
npm run dev:watch
```

### Production

```bash
# Build application
npm run build

# Start production server
npm start

# Docker deployment
./scripts/deploy.sh docker

# Docker Compose deployment
./scripts/deploy.sh compose
```

### Maintenance

```bash
# Run health check
./scripts/deploy.sh health

# Run tests
./scripts/deploy.sh test

# Build only
./scripts/deploy.sh build
```

## 🔒 Security Checklist

- ✅ Security headers configured
- ✅ CSP (Content Security Policy) enabled
- ✅ Rate limiting implemented
- ✅ Fail2ban configured (VPS)
- ✅ Firewall configured (UFW)
- ✅ SSL/TLS enabled
- ✅ Environment variables secured
- ✅ Dependencies updated

## 📈 Performance Optimizations

- ✅ Image optimization with Next.js
- ✅ Code splitting and lazy loading
- ✅ Static asset caching
- ✅ Gzip compression
- ✅ CDN ready (Vercel/Cloudflare)
- ✅ Webpack optimizations
- ✅ Bundle analysis

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Clear cache and rebuild
   npm run clean
   npm run build
   ```

2. **Health Check Fails**
   ```bash
   # Check logs
   docker logs portfolio-container
   # Or
   sudo journalctl -u kanwalpreet-portfolio.service
   ```

3. **SSL Issues**
   ```bash
   # Renew certificate
   sudo certbot renew --dry-run
   ```

4. **Performance Issues**
   ```bash
   # Check metrics
   curl https://your-domain.com/api/metrics
   ```

### Support

For issues or questions:
1. Check application logs
2. Review health check endpoint
3. Check system resources (CPU, memory, disk)
4. Verify environment variables
5. Check network connectivity

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)

---

**🎉 Your portfolio is now production-ready with enterprise-grade features!**
