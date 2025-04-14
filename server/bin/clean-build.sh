#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting clean build process..."

# Stop and remove existing containers
echo "🧹 Cleaning up existing containers..."
docker compose down -v

# Build and start containers
echo "🏗️ Building and starting containers..."
docker compose up -d --build

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 10

# Run database migrations
echo "🔄 Running database migrations..."
npm run db:generate
npm run db:migrate

echo "✅ Build and migration process completed!"
