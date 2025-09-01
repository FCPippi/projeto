#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Generate Prisma client (just in case)
echo "Generating Prisma client..."
npx prisma generate

# Apply database migrations
echo "Applying database migrations..."
npx prisma migrate deploy

# Start the application
echo "Starting NestJS application..."
exec npm run start:prod
