#!/bin/bash
 
rm -rf ./.amplify-hosting
 
mkdir -p ./.amplify-hosting/compute
 
# Copy the application files (adjust if needed)
cp -r . ./.amplify-hosting/compute/default
cp -r ./node_modules ./.amplify-hosting/compute/default/node_modules
 
# Copy static files
cp -r public ./.amplify-hosting/static
 
# Copy the deploy manifest
cp deploy-manifest.json ./.amplify-hosting/deploy-manifest.json