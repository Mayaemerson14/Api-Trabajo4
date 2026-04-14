# 🏦 GASTOS.APP - Gestión Financiera Full Stack

¡Bienvenido a **GASTOS.APP**! Esta es una plataforma integral diseñada para ayudar a los usuarios a tomar el control total de sus finanzas personales. El proyecto implementa un flujo completo de autenticación y manejo de datos en tiempo real.

---

## 📑 Índice
* [Características](#-características)
* [Stack Tecnológico](#-stack-tecnológico)
* [Configuración Local](#-configuración-local)
* [Estructura del Proyecto](#-estructura-del-proyecto)
* [Despliegue](#-despliegue)

---

## ✨ Características
* **Autenticación Segura:** Sistema de Login y Registro basado en JWT (JSON Web Tokens).
* **Gestión de Gastos:** CRUD completo para administrar ingresos y egresos.
* **Interfaz Moderna:** Diseño responsive enfocado en la experiencia de usuario (UX).
* **Persistencia de Datos:** Conexión directa con MongoDB Atlas.

---

## 🛠️ Stack Tecnológico

| Área | Tecnologías |
| :--- | :--- |
| **Frontend** | React, Vite, Axios, Bootstrap Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (NoSQL) |
| **Seguridad** | JWT, Bcrypt, Dotenv |

---

## ⚙️ Configuración Local

### Paso 1: Clonar y Preparar
```bash
git clone [https://github.com/Mayaemerson14/Api-Trabajo4.git](https://github.com/Mayaemerson14/Api-Trabajo4.git)
cd Api-Trabajo4

cd backend
npm install
# Crear archivo .env con: 
# PORT=3000, MONGO_URI, JWT_SECRET
npm run dev

cd ../app
npm install
npm run dev

📂 Estructura del Proyecto

📦 Api-de-Gastos
 ┣ 📂 app (Frontend)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 features
 ┃ ┃ ┃ ┣ 📂 apis       <-- Conexión con el servidor
 ┃ ┃ ┃ ┗ 📂 auth       <-- Lógica de usuario
 ┃ ┃ ┣ 📂 shared     <-- Estilos globales
 ┃ ┃ ┗ 📜 App.jsx
 ┃ ┗ 📜 index.html
 ┗ 📂 backend
   ┣ 📂 models       <-- Esquemas de MongoDB
   ┣ 📜 server.js     <-- Punto de entrada
   ┗ 📜 .env          <-- Configuración sensible

🔐 Variables de Entorno
Para que el proyecto funcione correctamente, crea un archivo .env en la carpeta backend con los siguientes datos:

Fragmento de código
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/gastos
JWT_SECRET=tu_llave_maestra_123
🌐 Enlaces del Proyecto
Repositorio: https://github.com/Mayaemerson14/Api-Trabajo4


👤 Autor
Emerson Maya

GitHub: @Mayaemerson14

Este proyecto fue desarrollado como parte del proceso de formación en Desarrollo Web Full Stack.   