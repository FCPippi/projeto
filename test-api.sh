# Test Script para API
# Use este script para testar as rotas da API

# 1. Test health check
echo "Testing health check..."
curl -X GET http://localhost:3000/

echo -e "\n\n2. Testing register..."
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'

echo -e "\n\n3. Testing login..."
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'

echo -e "\n\n4. Testing profile (replace TOKEN with the token from login)..."
echo "curl -X GET http://localhost:3000/auth/profile -H \"Authorization: Bearer YOUR_TOKEN_HERE\""

echo -e "\n\nSwagger documentation available at: http://localhost:3000/api"
