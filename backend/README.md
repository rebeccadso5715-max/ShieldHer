# ShieldHer Backend

Spring Boot + H2 backend for the ShieldHer React app.

## Run

```powershell
cd backend
mvn spring-boot:run
```

The API runs at `http://127.0.0.1:8080`.

## H2 Console

Open `http://127.0.0.1:8080/h2-console`.

Use:

```txt
JDBC URL: jdbc:h2:file:./data/shieldher
User Name: sa
Password:
```

The default admin account is:

```txt
Email: admin@shieldher.local
Password: Admin@123
```
