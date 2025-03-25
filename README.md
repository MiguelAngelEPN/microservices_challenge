# microservices_challenge
The challenge of banking transaction microservices

Este proyecto implementa un sistema basado en microservicios utilizando NestJS, MongoDB, y MySQL. Se compone de los siguientes servicios:

Core Service (Gestión de transacciones)

User Service (Gestión de usuarios y cuentas de usuario)

Account Service (Gestión de cuentas y saldos)

🚀 Requisitos Previos

Antes de ejecutar los servicios, asegúrate de tener instalado lo siguiente:

Node.js (versión 16 o superior)

Docker (para ejecución con contenedores opcional)

MongoDB (si ejecutas sin Docker)

MySQL (si ejecutas sin Docker)

📂 Estructura del Proyecto
.
├── core-service/      # Servicio principal de transacciones
├── user-service/      # Servicio de usuarios
├── account-service/   # Servicio de cuentas
├── docker-compose.yml # Configuración para ejecución con Docker
├── README.md          # Documentación del proyecto

🔧 Configuración

Cada servicio tiene un archivo .env donde se definen las variables de entorno necesarias. Asegúrate de crear estos archivos dentro de cada carpeta de servicio con el siguiente contenido:

📌 Configuración de Core Service (core-service/.env)

PORT=3000
USER_SERVICE=http://localhost:3001/user/service
ACOUNT_SERVICE=http://localhost:3002/account/service
MONGO_URI=mongodb://localhost:27017/transactions

📌 Configuración de User Service (user-service/.env)

PORT=3001
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=users_db

📌 Configuración de Account Service (account-service/.env)
PORT=3002
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=accounts_db

🏃‍♂️ Ejecución
1️⃣Instala dependencias en cada servicio

Ejecuta estos comandos dentro de cada carpeta (core-service/, user-service/, account-service/):

npm install


2️⃣ Inicia cada servicio manualmente

cd user-service && npm run start
cd account-service && npm run start
cd core-service && npm run start

Cada servicio se ejecutará en su puerto correspondiente:

Core Service: http://localhost:3000

User Service: http://localhost:3001

Account Service: http://localhost:3002

# Endpoints Principales

🏦 Core Service (Transacciones)

POST /transactions

{
  "accountId": "12345",
  "amount": 100.50,
  "depositType": "CASH"
}

👤 User Service (Usuarios y Cuentas)

GET /users/{accountId} → Obtiene información de un usuario

💰 Account Service (Cuentas y Saldos)

GET /accounts/{accountNumber} → Verifica si la cuenta está activa

POST /accounts/deposit → Agrega saldo a una cuenta


📢 Conclusión

Este proyecto demuestra el uso de microservicios con NestJS, MongoDB y MySQL, integrando comunicación entre servicios mediante llamadas HTTP.

