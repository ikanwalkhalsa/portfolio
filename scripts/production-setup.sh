#!/bin/bash

# Production Environment Setup Script
# This script sets up the production environment with all necessary configurations

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="kanwalpreet-portfolio"
PRODUCTION_USER="portfolio"
PRODUCTION_DIR="/opt/$APP_NAME"
SERVICE_NAME="$APP_NAME.service"

# Functions
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Check if running as root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        error "This script must be run as root (use sudo)"
    fi
}

# Update system packages
update_system() {
    log "Updating system packages..."
    
    apt-get update
    apt-get upgrade -y
    
    success "System packages updated"
}

# Install required packages
install_packages() {
    log "Installing required packages..."
    
    apt-get install -y \
        curl \
        wget \
        git \
        nginx \
        certbot \
        python3-certbot-nginx \
        ufw \
        fail2ban \
        htop \
        unzip \
        software-properties-common
    
    success "Required packages installed"
}

# Install Node.js
install_nodejs() {
    log "Installing Node.js..."
    
    # Install Node.js 20 LTS
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    
    # Verify installation
    node --version
    npm --version
    
    success "Node.js installed"
}

# Install Docker
install_docker() {
    log "Installing Docker..."
    
    # Remove old Docker installations
    apt-get remove -y docker docker-engine docker.io containerd runc || true
    
    # Install Docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    
    # Add current user to docker group
    usermod -aG docker $SUDO_USER
    
    # Install Docker Compose
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    
    # Start Docker service
    systemctl enable docker
    systemctl start docker
    
    success "Docker installed"
}

# Create production user
create_user() {
    log "Creating production user..."
    
    if ! id "$PRODUCTION_USER" &>/dev/null; then
        useradd -m -s /bin/bash "$PRODUCTION_USER"
        usermod -aG docker "$PRODUCTION_USER"
        success "Production user created: $PRODUCTION_USER"
    else
        warning "Production user already exists: $PRODUCTION_USER"
    fi
}

# Setup application directory
setup_app_directory() {
    log "Setting up application directory..."
    
    mkdir -p "$PRODUCTION_DIR"
    chown -R "$PRODUCTION_USER:$PRODUCTION_USER" "$PRODUCTION_DIR"
    
    success "Application directory created: $PRODUCTION_DIR"
}

# Configure firewall
configure_firewall() {
    log "Configuring firewall..."
    
    # Enable UFW
    ufw --force enable
    
    # Allow SSH
    ufw allow ssh
    
    # Allow HTTP and HTTPS
    ufw allow 80/tcp
    ufw allow 443/tcp
    
    # Allow application port (if not using reverse proxy)
    ufw allow 3000/tcp
    
    success "Firewall configured"
}

# Configure fail2ban
configure_fail2ban() {
    log "Configuring fail2ban..."
    
    cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 3
EOF

    systemctl enable fail2ban
    systemctl restart fail2ban
    
    success "Fail2ban configured"
}

# Configure Nginx
configure_nginx() {
    log "Configuring Nginx..."
    
    # Remove default site
    rm -f /etc/nginx/sites-enabled/default
    
    # Create application configuration
    cat > /etc/nginx/sites-available/$APP_NAME << EOF
server {
    listen 80;
    server_name _;
    
    # Redirect HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name _;
    
    # SSL configuration (will be updated by certbot)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # Proxy to Next.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Cache static assets
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # Health check endpoint
    location /health {
        proxy_pass http://localhost:3000/api/health;
        access_log off;
    }
}
EOF

    # Enable site
    ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
    
    # Test configuration
    nginx -t
    
    # Restart Nginx
    systemctl enable nginx
    systemctl restart nginx
    
    success "Nginx configured"
}

# Create systemd service
create_systemd_service() {
    log "Creating systemd service..."
    
    cat > /etc/systemd/system/$SERVICE_NAME << EOF
[Unit]
Description=Kanwalpreet Singh Portfolio
After=network.target

[Service]
Type=simple
User=$PRODUCTION_USER
WorkingDirectory=$PRODUCTION_DIR
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=NEXT_PUBLIC_BASE_URL=https://your-domain.com

[Install]
WantedBy=multi-user.target
EOF

    systemctl daemon-reload
    systemctl enable $SERVICE_NAME
    
    success "Systemd service created"
}

# Setup SSL with Let's Encrypt
setup_ssl() {
    log "Setting up SSL with Let's Encrypt..."
    
    echo "To setup SSL, run the following command after updating your domain:"
    echo "certbot --nginx -d your-domain.com"
    echo
    warning "SSL setup requires manual configuration with your domain name"
}

# Create deployment script for production user
create_deployment_script() {
    log "Creating deployment script for production user..."
    
    cat > $PRODUCTION_DIR/deploy.sh << EOF
#!/bin/bash
set -e

# Pull latest changes
git pull origin main

# Install dependencies
npm ci --only=production

# Build application
npm run build

# Restart service
sudo systemctl restart $SERVICE_NAME

echo "Deployment completed successfully!"
EOF

    chmod +x $PRODUCTION_DIR/deploy.sh
    chown $PRODUCTION_USER:$PRODUCTION_USER $PRODUCTION_DIR/deploy.sh
    
    success "Deployment script created"
}

# Main setup function
main() {
    echo "🔧 Setting up production environment for $APP_NAME"
    echo
    
    case "${1:-full}" in
        "full")
            check_root
            update_system
            install_packages
            install_nodejs
            install_docker
            create_user
            setup_app_directory
            configure_firewall
            configure_fail2ban
            configure_nginx
            create_systemd_service
            create_deployment_script
            setup_ssl
            ;;
        "nginx")
            check_root
            configure_nginx
            ;;
        "ssl")
            check_root
            setup_ssl
            ;;
        "service")
            check_root
            create_systemd_service
            ;;
        *)
            echo "Usage: $0 {full|nginx|ssl|service}"
            echo
            echo "Commands:"
            echo "  full     - Complete production setup (default)"
            echo "  nginx    - Configure Nginx only"
            echo "  ssl      - Setup SSL with Let's Encrypt"
            echo "  service  - Create systemd service only"
            exit 1
            ;;
    esac
    
    echo
    success "Production setup completed!"
    echo
    echo "📋 Next Steps:"
    echo "  1. Update your domain in Nginx configuration"
    echo "  2. Setup SSL: certbot --nginx -d your-domain.com"
    echo "  3. Deploy your application to $PRODUCTION_DIR"
    echo "  4. Start the service: systemctl start $SERVICE_NAME"
    echo
    echo "🔧 Useful Commands:"
    echo "  • Service status: systemctl status $SERVICE_NAME"
    echo "  • View logs: journalctl -u $SERVICE_NAME -f"
    echo "  • Restart service: systemctl restart $SERVICE_NAME"
    echo "  • Nginx status: systemctl status nginx"
    echo "  • View Nginx logs: tail -f /var/log/nginx/access.log"
}

# Run main function with all arguments
main "$@"
