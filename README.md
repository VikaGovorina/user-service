# User Service API

## Описание

REST API сервис для управления пользователями с JWT-аутентификацией и ролевой моделью доступа.

## Стек

- TypeScript
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT
- Zod
- bcrypt

## Функционал

- Регистрация пользователя
- Авторизация пользователя
- JWT-аутентификация
- Ролевая модель доступа (ADMIN / USER)
- Получение пользователя по ID
- Получение списка пользователей
- Блокировка пользователя
- Проверка прав доступа
- Валидация входных данных
- Централизованная обработка ошибок
- Seed admin пользователя

## Установка и запуск

1. Клонировать репозиторий

```
git clone https://github.com/VikaGovorina/user-service
cd user-service
```

2. Установить зависимости

```
npm install
```

3. Создать .env на основе .env.default

4. Запуск контейнера

```
docker-compose up -d
```

5. Применить миграции

```
npx prisma migrate dev
```

6. Сгенерировать Prisma Client

```
npx prisma generate
```

7. Seed admin пользователя

```
npm run seed:admin
```

### Данные администратора

email: admin@example.com
password: admin123

8. Запуск проекта

```
npm run dev
```

## Авторизация

Для защищённых endpoint необходимо передавать JWT token:

Authorization: Bearer token

## API Endpoints

### Auth

Регистрация

```
POST /auth/register
```

Авторизация

```
POST /auth/login
```

### Users

Получить пользователя по ID

```
GET /users/:id
```

Доступ:

- ADMIN
- владелец аккаунта

Получить список пользователей

```
GET /users
```

Доступ:

- только ADMIN

Заблокировать пользователя

```
PATCH /users/:id/block
```

Доступ:

- ADMIN
- владелец аккаунта
