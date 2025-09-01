# NestJS Authentication API with Docker, PostgreSQL, Prisma, and CI/CD

Uma aplicação completa em NestJS com autenticação JWT, PostgreSQL, Prisma ORM, containerização Docker e pipeline CI/CD para deploy na AWS EC2.

## 🚀 Funcionalidades

- ✅ **Autenticação JWT** - Login e registro de usuários
- ✅ **PostgreSQL + Prisma** - Banco de dados relacional com ORM moderno
- ✅ **Docker & Docker Compose** - Containerização completa
- ✅ **Swagger Documentation** - Documentação automática da API
- ✅ **GitHub Actions CI/CD** - Pipeline automatizado para AWS EC2
- ✅ **Validação de dados** - Usando class-validator
- ✅ **Segurança** - Helmet, CORS, validação de JWT
- ✅ **Multi-stage Docker build** - Otimizado para produção

## 📋 Pré-requisitos

- Node.js (v18+)
- Docker & Docker Compose
- PostgreSQL (se não usar Docker)
- Conta AWS (para deploy)

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <your-repo-url>
cd nestjs-auth-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/nestjs_auth_app?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="1d"

# App
PORT=3000
NODE_ENV=development
```

### 4. Execute com Docker (Recomendado)
```bash
# Desenvolvimento
docker-compose up app-dev

# Produção
docker-compose up app
```

### 5. Ou execute localmente
```bash
# Inicie o PostgreSQL separadamente
docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=nestjs_auth_app -p 5432:5432 -d postgres:15

# Execute as migrações
npx prisma migrate dev --name init

# Inicie a aplicação
npm run start:dev
```

## 📖 Uso da API

### Endpoints Disponíveis

A aplicação estará disponível em `http://localhost:3000`
Documentação Swagger: `http://localhost:3001/api`

#### Autenticação

**POST** `/auth/register` - Registrar usuário
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**POST** `/auth/login` - Login
```json
{
  "username": "username",
  "password": "password123"
}
```

**GET** `/auth/profile` - Perfil do usuário (requer JWT)
```bash
Authorization: Bearer <jwt_token>
```

## 🐳 Docker

### Desenvolvimento
```bash
docker-compose up app-dev
```

### Produção
```bash
docker-compose up app
```

### Build manual
```bash
docker build -t nestjs-auth-app .
docker run -p 3000:3000 nestjs-auth-app
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Inicia em modo desenvolvimento
npm run start:debug        # Inicia em modo debug

# Produção
npm run build              # Build da aplicação
npm run start:prod         # Inicia em modo produção

# Prisma
npm run prisma:generate    # Gera o cliente Prisma
npm run prisma:migrate     # Executa migrações
npm run prisma:studio      # Abre Prisma Studio

# Testes
npm run test               # Testes unitários
npm run test:e2e           # Testes end-to-end
npm run test:cov           # Cobertura de testes

# Docker
npm run docker:build       # Build da imagem Docker
npm run docker:run         # Executa Docker Compose
```

## 🚀 Deploy na AWS EC2

### 1. Configuração dos Secrets no GitHub

Adicione os seguintes secrets no seu repositório GitHub:

```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
EC2_HOST=your_ec2_public_ip
EC2_PRIVATE_KEY=your_ec2_private_key_content
JWT_SECRET=your_production_jwt_secret
POSTGRES_PASSWORD=your_production_db_password
```

### 2. Configuração da EC2

1. Lance uma instância EC2 (Amazon Linux 2)
2. Configure o Security Group para permitir:
   - SSH (22) do seu IP
   - HTTP (80) de qualquer lugar
   - HTTPS (443) de qualquer lugar

### 3. Configuração do ECR

```bash
# Crie um repositório no ECR
aws ecr create-repository --repository-name nestjs-auth-app --region us-east-1
```

### 4. Deploy Automático

O deploy é automatizado via GitHub Actions:
- Push para `main` → Deploy automático
- Pull requests → Executa apenas testes

## 📁 Estrutura do Projeto

```
src/
├── auth/                  # Módulo de autenticação
│   ├── dto/              # Data Transfer Objects
│   ├── guards/           # Guards de autenticação
│   ├── strategies/       # Estratégias Passport
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── prisma/               # Configuração Prisma
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
prisma/
├── schema.prisma         # Schema do banco de dados
└── migrations/           # Migrações do banco
.github/
└── workflows/
    └── ci-cd.yml         # Pipeline CI/CD
```

## 🔒 Segurança

- **JWT Authentication** - Tokens seguros com expiração
- **Password Hashing** - Bcrypt para hash de senhas
- **Helmet** - Headers de segurança
- **CORS** - Configuração adequada de CORS
- **Validation** - Validação rigorosa de dados de entrada
- **Environment Variables** - Configurações sensíveis em variáveis de ambiente

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes com cobertura
npm run test:cov

# Testes E2E
npm run test:e2e

# Testes em modo watch
npm run test:watch
```

## 📊 Monitoramento

- **Health Check** - Endpoint de saúde da aplicação
- **Swagger Docs** - Documentação automática
- **Logs** - Sistema de logs estruturado
- **Docker Health Check** - Verificação de saúde do container

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se você tiver problemas ou dúvidas:

1. Verifique a [documentação](#)
2. Procure em [Issues existentes](../../issues)
3. Crie uma [Nova Issue](../../issues/new)

---

**Desenvolvido com ❤️ usando NestJS, PostgreSQL, Prisma e Docker**
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
