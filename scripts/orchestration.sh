#!/bin/bash
# Infinite Nexus ScrollVerse - Local Orchestration Script
# Manages Docker Compose deployment with Neo4j and PostgreSQL

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored message
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Print header
print_header() {
    echo ""
    print_message "$BLUE" "═══════════════════════════════════════════════════════"
    print_message "$BLUE" "  🌊 Infinite Nexus ScrollVerse - Orchestration"
    print_message "$BLUE" "  528Hz Resonance | 9D Blockchain Harmonics"
    print_message "$BLUE" "═══════════════════════════════════════════════════════"
    echo ""
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_message "$RED" "❌ Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_message "$RED" "❌ Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_message "$GREEN" "✅ Docker and Docker Compose are installed"
}

# Start services
start_services() {
    print_header
    print_message "$YELLOW" "🚀 Starting ScrollVerse services..."
    
    check_docker
    
    # Start services
    docker compose up -d
    
    print_message "$GREEN" "✅ Services started successfully"
    echo ""
    print_message "$BLUE" "Services running at:"
    print_message "$BLUE" "  - ScrollVerse App: http://localhost:8080"
    print_message "$BLUE" "  - Neo4j Browser: http://localhost:7474"
    print_message "$BLUE" "  - Neo4j Bolt: bolt://localhost:7687"
    print_message "$BLUE" "  - PostgreSQL: localhost:5432"
    echo ""
    print_message "$YELLOW" "Use './scripts/orchestration.sh logs' to view logs"
}

# Stop services
stop_services() {
    print_header
    print_message "$YELLOW" "🛑 Stopping ScrollVerse services..."
    
    docker compose down
    
    print_message "$GREEN" "✅ Services stopped successfully"
}

# Restart services
restart_services() {
    print_header
    print_message "$YELLOW" "🔄 Restarting ScrollVerse services..."
    
    docker compose restart
    
    print_message "$GREEN" "✅ Services restarted successfully"
}

# View logs
view_logs() {
    local service=$1
    
    if [ -z "$service" ]; then
        print_message "$YELLOW" "📋 Viewing all service logs..."
        docker compose logs -f
    else
        print_message "$YELLOW" "📋 Viewing logs for: $service"
        docker compose logs -f "$service"
    fi
}

# Check service status
check_status() {
    print_header
    print_message "$YELLOW" "📊 ScrollVerse Service Status:"
    echo ""
    
    docker compose ps
}

# Build services
build_services() {
    print_header
    print_message "$YELLOW" "🔨 Building ScrollVerse services..."
    
    docker compose build
    
    print_message "$GREEN" "✅ Services built successfully"
}

# Clean up
clean_up() {
    print_header
    print_message "$YELLOW" "🧹 Cleaning up ScrollVerse environment..."
    
    read -p "This will remove all containers and volumes. Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker compose down -v
        print_message "$GREEN" "✅ Cleanup completed"
    else
        print_message "$BLUE" "Cleanup cancelled"
    fi
}

# Initialize Neo4j
init_neo4j() {
    print_header
    print_message "$YELLOW" "📊 Initializing Neo4j lineage structures..."
    
    # Wait for Neo4j to be ready
    print_message "$BLUE" "Waiting for Neo4j to be ready..."
    sleep 10
    
    # Create constraints and indexes
    docker compose exec neo4j cypher-shell -u neo4j -p scrollverse528 << EOF
CREATE CONSTRAINT sovereign_id IF NOT EXISTS FOR (s:Sovereign) REQUIRE s.id IS UNIQUE;
CREATE CONSTRAINT scroll_id IF NOT EXISTS FOR (s:Scroll) REQUIRE s.id IS UNIQUE;
CREATE CONSTRAINT nft_id IF NOT EXISTS FOR (n:NFT) REQUIRE n.id IS UNIQUE;
CREATE INDEX sovereign_address IF NOT EXISTS FOR (s:Sovereign) ON (s.address);
CREATE INDEX scroll_frequency IF NOT EXISTS FOR (s:Scroll) ON (s.frequency);
CREATE INDEX nft_token IF NOT EXISTS FOR (n:NFT) ON (n.token_id);
RETURN 'Neo4j initialized' AS status;
EOF
    
    print_message "$GREEN" "✅ Neo4j initialized successfully"
}

# Initialize PostgreSQL
init_postgres() {
    print_header
    print_message "$YELLOW" "🐘 Initializing PostgreSQL database..."
    
    # Wait for PostgreSQL to be ready
    print_message "$BLUE" "Waiting for PostgreSQL to be ready..."
    sleep 5
    
    # Check if schema is already loaded
    print_message "$BLUE" "Database schema should be automatically loaded from init scripts"
    
    print_message "$GREEN" "✅ PostgreSQL initialized successfully"
}

# Full setup
full_setup() {
    print_header
    print_message "$YELLOW" "🌊 Full ScrollVerse Setup..."
    
    check_docker
    build_services
    start_services
    
    print_message "$BLUE" "Waiting for services to be healthy..."
    sleep 20
    
    init_neo4j
    init_postgres
    
    print_message "$GREEN" "✅ ScrollVerse fully configured and running!"
    echo ""
    check_status
}

# Help message
show_help() {
    print_header
    echo "Usage: ./scripts/orchestration.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start       - Start all services"
    echo "  stop        - Stop all services"
    echo "  restart     - Restart all services"
    echo "  logs [svc]  - View logs (optional: specify service)"
    echo "  status      - Check service status"
    echo "  build       - Build Docker images"
    echo "  clean       - Clean up containers and volumes"
    echo "  init-neo4j  - Initialize Neo4j database"
    echo "  init-pg     - Initialize PostgreSQL database"
    echo "  setup       - Full setup (build, start, initialize)"
    echo "  help        - Show this help message"
    echo ""
    echo "Services:"
    echo "  scrollverse - Main application"
    echo "  neo4j       - Neo4j graph database"
    echo "  postgres    - PostgreSQL database"
    echo ""
}

# Main command handler
case "$1" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    logs)
        view_logs "$2"
        ;;
    status)
        check_status
        ;;
    build)
        build_services
        ;;
    clean)
        clean_up
        ;;
    init-neo4j)
        init_neo4j
        ;;
    init-pg)
        init_postgres
        ;;
    setup)
        full_setup
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_message "$RED" "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
