#!/bin/bash
echo "=== Starting VPS Build & Deployment ==="

# Load NVM if present
if [ -f "$HOME/.nvm/nvm.sh" ]; then
    echo "Loading NVM from $HOME/.nvm/nvm.sh..."
    source "$HOME/.nvm/nvm.sh"
elif [ -f "/root/.nvm/nvm.sh" ]; then
    echo "Loading NVM from /root/.nvm/nvm.sh..."
    source "/root/.nvm/nvm.sh"
fi

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
