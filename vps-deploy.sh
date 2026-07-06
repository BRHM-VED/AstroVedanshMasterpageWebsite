#!/bin/bash
echo "=== Starting VPS Build & Deployment ==="

# Install dependencies
echo "Installing npm dependencies..."
npm install

# Build the project
echo "Building the application for production..."
npm run build

# Reload Nginx to apply changes
echo "Reloading Nginx web server..."
sudo systemctl reload nginx

echo "=== VPS Deployment Completed Successfully! ==="
