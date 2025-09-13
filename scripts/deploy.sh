#!/bin/bash

# Production Deployment Script
# This script handles the complete deployment process for the Next.js portfolio

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="kanwalpreet-portfolio"
DOCKER_IMAGE="$APP_NAME:latest"
CONTAINER_NAME="$APP_NAME-container"
PORT=${PORT:-3000}

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

# Check if required tools are installed
check_dependencies() {
    log "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        error "Node.js is not installed"
    fi
    
    if ! command -v npm &> /dev/null; then
        error "npm is not installed"
    fi
    
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
    fi
    
    success "All dependencies are installed"
}

# Validate environment
validate_environment() {
    log "Validating environment..."
    
    if [ -z "$NODE_ENV" ]; then
        export NODE_ENV=production
        warning "NODE_ENV not set, using production"
    fi
    
    if [ "$NODE_ENV" != "production" ]; then
        warning "NODE_ENV is set to $NODE_ENV, but deploying to production"
    fi
    
    # Check if required environment variables are set
    if [ -z "$NEXT_PUBLIC_BASE_URL" ]; then
        error "NEXT_PUBLIC_BASE_URL is required"
    fi
    
    success "Environment validation passed"
}

# Install dependencies
install_dependencies() {
    log "Installing dependencies..."
    npm ci --only=production
    success "Dependencies installed"
}

# Run tests
run_tests() {
    log "Running tests..."
    
    # Type checking
    log "Running TypeScript type check..."
    npm run type-check || warning "TypeScript type check failed"
    
    # Linting
    log "Running ESLint..."
    npm run lint || warning "ESLint check failed"
    
    success "Tests completed"
}

# Build application
build_application() {
    log "Building application..."
    
    # Clean previous build
    rm -rf .next
    
    # Build
    npm run build
    
    success "Application built successfully"
}

# Build Docker image
build_docker_image() {
    log "Building Docker image..."
    
    docker build -t "$DOCKER_IMAGE" .
    
    success "Docker image built: $DOCKER_IMAGE"
}

# Deploy with Docker
deploy_docker() {
    log "Deploying with Docker..."
    
    # Stop existing container
    if docker ps -q -f name="$CONTAINER_NAME" | grep -q .; then
        log "Stopping existing container..."
        docker stop "$CONTAINER_NAME"
        docker rm "$CONTAINER_NAME"
    fi
    
    # Run new container
    log "Starting new container..."
    docker run -d \
        --name "$CONTAINER_NAME" \
        --restart unless-stopped \
        -p "$PORT:3000" \
        -e NODE_ENV=production \
        -e NEXT_PUBLIC_BASE_URL="$NEXT_PUBLIC_BASE_URL" \
        "$DOCKER_IMAGE"
    
    success "Container deployed and running on port $PORT"
}

# Deploy with Docker Compose
deploy_compose() {
    log "Deploying with Docker Compose..."
    
    # Stop existing services
    docker-compose down
    
    # Start services
    docker-compose up -d
    
    success "Services deployed with Docker Compose"
}

# Health check
health_check() {
    log "Performing health check..."
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "http://localhost:$PORT/health" > /dev/null; then
            success "Health check passed"
            return 0
        fi
        
        log "Health check attempt $attempt/$max_attempts failed, retrying in 5 seconds..."
        sleep 5
        ((attempt++))
    done
    
    error "Health check failed after $max_attempts attempts"
}

# Show deployment info
show_deployment_info() {
    log "Deployment completed successfully!"
    echo
    echo "📊 Deployment Information:"
    echo "  • Application: $APP_NAME"
    echo "  • Environment: $NODE_ENV"
    echo "  • Port: $PORT"
    echo "  • URL: $NEXT_PUBLIC_BASE_URL"
    echo "  • Health Check: http://localhost:$PORT/health"
    echo "  • Metrics: http://localhost:$PORT/api/metrics"
    echo
    echo "🐳 Docker Commands:"
    echo "  • View logs: docker logs $CONTAINER_NAME"
    echo "  • Stop: docker stop $CONTAINER_NAME"
    echo "  • Restart: docker restart $CONTAINER_NAME"
    echo "  • Remove: docker rm $CONTAINER_NAME"
    echo
    echo "📈 Monitoring:"
    echo "  • Health: curl http://localhost:$PORT/health"
    echo "  • Metrics: curl http://localhost:$PORT/api/metrics"
}

# Main deployment function
main() {
    echo "🚀 Starting deployment of $APP_NAME"
    echo
    
    case "${1:-docker}" in
        "docker")
            check_dependencies
            validate_environment
            build_docker_image
            deploy_docker
            health_check
            show_deployment_info
            ;;
        "compose")
            check_dependencies
            validate_environment
            deploy_compose
            health_check
            show_deployment_info
            ;;
        "build")
            check_dependencies
            validate_environment
            install_dependencies
            run_tests
            build_application
            success "Build completed successfully"
            ;;
        "test")
            check_dependencies
            run_tests
            ;;
        "health")
            health_check
            ;;
        *)
            echo "Usage: $0 {docker|compose|build|test|health}"
            echo
            echo "Commands:"
            echo "  docker   - Deploy using Docker (default)"
            echo "  compose  - Deploy using Docker Compose"
            echo "  build    - Build application only"
            echo "  test     - Run tests only"
            echo "  health   - Run health check only"
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
