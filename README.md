# ShieldHer

Dark purple and gold women safety web app with a React frontend, Spring Boot Java backend, and H2 database.

## Requirements

- Node.js
- JDK 17 or newer
- Maven
- Optional: Python 3 for the smoke-test helper

## Run Backend

```powershell
cd backend
mvn spring-boot:run
```

Backend API: `http://127.0.0.1:8080/api`

H2 Console: `http://127.0.0.1:8080/h2-console`

```txt
JDBC URL: jdbc:h2:file:./data/shieldher
User Name: sa
Password:
```

## Run Frontend

Open another terminal:

```powershell
npm.cmd install
npm.cmd run dev:frontend
```

Frontend: `http://127.0.0.1:5173`

## Demo Login

```txt
Email: admin@shieldher.local
Password: Admin@123
```

## Optional Python Check

After the backend is running:

```powershell
python tools/api_smoke_test.py
```

## Full Stack Deploy

This repo includes `render.yaml` for deploying the full stack on Render:

- React frontend as a static site
- Spring Boot backend as a web service
- Render Postgres database

Steps:

1. Push this folder to a GitHub repository.
2. Open Render Dashboard.
3. Choose New > Blueprint.
4. Connect the GitHub repository and select `render.yaml`.
5. Create the Blueprint.

Render will create:

```txt
shieldher-frontend
shieldher-backend
shieldher-db
```

If Render changes the generated frontend or backend URL, update:

```txt
Frontend VITE_API_BASE=https://your-backend-url/api
Backend SHIELDHER_FRONTEND_ORIGIN=https://your-frontend-url
```
