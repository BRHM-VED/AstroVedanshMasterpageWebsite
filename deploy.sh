#!/bin/bash
echo "=== Starting Local Deployment Helper ==="

# Check if Git is initialized
if [ ! -d .git ]; then
    echo "Initializing Git repository..."
    git init
    git branch -M main
fi

# Configure Remote URL
REMOTE_URL="https://github.com/BRHM-VED/AstroVedanshMasterpageWebsite.git"
git remote remove origin 2>/dev/null
git remote add origin "$REMOTE_URL"
echo "Git remote set to: $REMOTE_URL"

# Add changes
echo "Staging files..."
git add .

# Commit changes
echo "Committing files..."
git commit -m "Deploy: Setup environment variables and deployment scripts"

# Push to GitHub
echo "Pushing changes to GitHub (main branch)..."
git push -u origin main

echo "=== Local Deploy Helper Finished ==="
