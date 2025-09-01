# 🚀 Deploy Guide - EC2 Setup

## Pré-requisitos na EC2

### 1. Conectar à instância EC2
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 2. Instalar Docker e Docker Compose
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalações
docker --version
docker-compose --version
```

### 3. Instalar Git e Node.js
```bash
# Git
sudo apt install git -y

# Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 4. Configurar projeto na EC2
```bash
# Clonar repositório
git clone https://github.com/SEU_USUARIO/nestjs-auth-app.git ProjetoCora
cd ProjetoCora

# Criar arquivo .env para produção
cp .env.example .env

# Editar .env com configurações de produção
nano .env
```

### 5. Configurar variáveis de ambiente para produção
```env
# Database
DATABASE_URL="postgresql://cora:cora@postgres:5432/projeto_cora?schema=public"

# JWT
JWT_SECRET="super-secret-production-jwt-key-change-this"
JWT_EXPIRES_IN="1d"

# App
PORT=3000
NODE_ENV=production
```

### 6. Primeiro deploy
```bash
# Build e start dos containers
docker-compose up -d --build

# Verificar se está funcionando
docker-compose ps
curl http://localhost:3000/
```

## Configuração do GitHub Actions

### Secrets necessários no GitHub:
- `EC2_SSH_KEY`: Conteúdo da chave privada (.pem)
- `EC2_HOST`: IP público da EC2
- `EC2_USER`: ubuntu (ou seu usuário)

### Como adicionar secrets:
1. Vá para Settings > Secrets and variables > Actions
2. Clique em "New repository secret"
3. Adicione cada secret

## Configuração de Segurança da EC2

### Security Groups:
- **HTTP**: Porta 80 de qualquer lugar (0.0.0.0/0)
- **HTTPS**: Porta 443 de qualquer lugar (0.0.0.0/0)
- **Custom**: Porta 3000 de qualquer lugar (0.0.0.0/0)
- **SSH**: Porta 22 do seu IP específico

### Nginx (Opcional - para produção)
```bash
# Instalar Nginx
sudo apt install nginx -y

# Configurar proxy reverso
sudo nano /etc/nginx/sites-available/nestjs-app
```

Conteúdo do arquivo Nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Ativar site
sudo ln -s /etc/nginx/sites-available/nestjs-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Comandos úteis para manutenção

```bash
# Ver logs da aplicação
docker-compose logs app

# Rebuild da aplicação
docker-compose down
docker-compose up -d --build

# Backup do banco
docker exec postgres pg_dump -U cora projeto_cora > backup.sql

# Restore do banco
docker exec -i postgres psql -U cora projeto_cora < backup.sql

# Monitorar recursos
htop
docker stats
```

## SSL/HTTPS com Let's Encrypt (Opcional)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obter certificado
sudo certbot --nginx -d your-domain.com

# Renovação automática
sudo crontab -e
# Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Troubleshooting

### Aplicação não inicia:
```bash
# Verificar logs
docker-compose logs app

# Verificar se o banco está rodando
docker-compose ps

# Regenerar Prisma client
docker-compose exec app npx prisma generate
```

### Erro de conexão com banco:
```bash
# Verificar se o banco está acessível
docker-compose exec app npx prisma db ping

# Rodar migrações manualmente
docker-compose exec app npx prisma migrate deploy
```

### Deploy falha:
1. Verificar se todas as secrets estão configuradas
2. Verificar conectividade SSH
3. Verificar se Docker está rodando na EC2
4. Verificar logs do GitHub Actions
