#!/bin/sh

echo "Waiting for MongoDB to start...."
./wait-for-it.sh database:27017

echo "Migrating the database..."
npm run db:up

echo "Starting the server..."
npm run dev