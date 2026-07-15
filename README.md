# SIVET CLOUD - Documentación Arquitectónica y Guía de Sustentación

**Desarrollador:** Frankly Giovanni Poveda Pinzon

**Programa:** Tecnología ADSO - SENA

**Tipo de Proyecto:** Plataforma SaaS Integral de Gestión Veterinaria en la Nube

# Introducción

SIVET CLOUD es una plataforma SaaS orientada a la administración integral de clínicas veterinarias.

El objetivo principal del sistema es centralizar los procesos clínicos, administrativos y financieros en una única plataforma web, permitiendo optimizar la atención de pacientes, la gestión de inventarios, la facturación y la administración del negocio.

Actualmente el proyecto se encuentra en desarrollo como trabajo de grado del programa Tecnología en Análisis y Desarrollo de Software (ADSO) del SENA.

# Objetivo General

Desarrollar una plataforma SaaS para la administración integral de clínicas veterinarias.

# Objetivos Específicos

- Gestionar pacientes.
- Gestionar propietarios.
- Gestionar citas.
- Gestionar historias clínicas.
- Gestionar inventario.
- Gestionar facturación.
- Generar reportes.

---

# Índice

- [Introducción](#introducción)
- [Objetivo General](#objetivo-general)
- [Objetivos Específicos](#objetivos-específicos)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Fundamentación Arquitectónica](#1-fundamentación-arquitectónica)
- [Estructura del Monorepo](#2-estructura-del-monorepo)
- [Registro de Operaciones y Resolución de Problemas](#3-registro-de-operaciones-y-resolución-de-problemas)
- [Sprint 2 - Backend y Base de Datos](#4-registro-de-operaciones-y-resolución-de-problemas)
- [Endpoints de la API REST](#5-endpoints-de-la-api-rest-y-contrato-de-datos)
- [Protocolo de Operación Diaria](#6-protocolo-de-operación-diaria-reactivación)
- [Cronología del Proyecto](#cronología-del-proyecto)
- [Historial de Sprints](#historial-de-sprints)

---

# Tecnologías Utilizadas

| Área | Tecnología |
|------|------------|
| 🎨 Frontend | HTML5, CSS3, JavaScript, Tailwind CSS |
| ⚙️ Backend | Node.js, Express.js |
| 🗄️ Base de Datos | MongoDB Atlas, MySQL, Firebase |
| 🔄 API | REST |
| 🧩 Arquitectura | MVC |
| 🌐 Control de Versiones | Git, GitHub |
| 💻 Editor | Visual Studio Code |
| 🧪 Pruebas | Thunder Client |
| 📦 Gestor de paquetes | npm |



# 1. Fundamentación Arquitectónica

Para la construcción de SIVET CLOUD se definió una **Arquitectura Cliente-Servidor Desacoplada**.

## Justificación Técnica

La separación física del frontend (interfaz de usuario) y el backend (lógica de negocio y bases de datos) permite que ambos entornos escalen de forma independiente. Esto es crucial para un entorno SaaS donde la carga de procesamiento visual no debe interferir con la latencia de las transacciones financieras o clínicas.

### Entorno Híbrido de Bases de Datos

Se implementa un modelo de persistencia políglota para optimizar la velocidad y coherencia de los datos según el módulo:

- **Firebase:** Gestión de autenticación, sesiones y actualizaciones en tiempo real (Notificaciones de Agendamiento).

- **MongoDB Atlas (NoSQL en la nube):** Almacenamiento del Historial Clínico y Agendamiento. Su flexibilidad documental se adapta a las variaciones en los registros médicos, donde un paciente puede tener campos anatómicos distintos a otro. La implementación mediante clúster (Replica Set) garantiza alta disponibilidad.

- **MySQL (SQL):** Almacenamiento para los Módulos de Inventario y Financiero. Garantiza el cumplimiento de las propiedades ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad), obligatorio para transacciones monetarias y control estricto de stock.

---

# 2. Estructura del Monorepo

Se implementó un patrón de Monorepo lógico en el entorno local. Esto permite mantener bajo un único sistema de control de versiones (Git) ambos ecosistemas.

```text
sivet-cloud/
├── frontend/               # Aplicación cliente
│   ├── public/             # Assets y archivo de entrada (index.html, output.css)
│   ├── src/
│   │   ├── components/     # Componentes de UI reutilizables
│   │   ├── modules/        # Vistas separadas por core del negocio
│   │   └── styles/         # Archivos fuente (index.css)
│   ├── tailwind.config.js  # Reglas del compilador
│   └── package.json        # Dependencias NPM del cliente
│
├── backend/                # API REST y lógica de persistencia
│   ├── src/
│   │   ├── config/         # Conexión a MongoDB Atlas (db.js)
│   │   ├── controllers/    # Lógica transaccional (MVC)
│   │   ├── models/         # Esquemas de validación (Mongoose)
│   │   ├── routes/         # Definición de endpoints (Express)
│   │   └── server.js       # Punto de entrada de la API
│   ├── .env                # Variables de entorno y credenciales seguras
│   └── package.json        # Dependencias del servidor (Express, Mongoose, nodemon)
│
├── .gitignore              # Archivos excluidos del control de versiones
│
└── README.md               # Este documento
```

---

# 3. Registro de Operaciones y Resolución de Problemas
## Sprint 1 - Inicialización

Durante la fase de inicialización, se presentaron escenarios técnicos que requirieron resolución algorítmica y de configuración.

### 3.1. Creación del archivo de exclusión (.gitignore)

El archivo `.gitignore` es imperativo antes del primer commit para evitar cargar la carpeta `node_modules` y archivos `.env` al repositorio público.

**Problema presentado:**

El entorno Windows (CMD) no reconoció el binario de Unix `touch`.

**Solución aplicada:**

Se empleó la redirección de flujo nulo propia de Windows:

```cmd
type nul > .gitignore
```

### 3.2. Configuración del Control de Versiones (Git)

Se inicializó el control de versiones local, se preparó el *staging area* y se realizó el primer commit de estructura.

```bash
git commit -m "chore: inicializar estructura base..."
```

**Problema presentado:**

Conflicto de alias en el enlace remoto (`error: remote origin already exists`) y error 404 por nombre de usuario incorrecto.

**Solución aplicada:**

Se purgó el registro corrupto:

```bash
git remote remove origin
```

Posteriormente se estableció el canal HTTPS correcto hacia GitHub, forzando la transferencia a la rama principal:

```bash
git push -u origin main
```

### 3.3. Inicialización del Entorno Node.js y Tailwind CSS

Se instaló Tailwind CSS en el entorno frontend como motor de estilos utilitarios.

**Problema presentado 1:**

Ausencia del comando `npm`.

**Solución 1:**

Instalación de Node.js (LTS), inyección en las Variables de Entorno (PATH) del sistema operativo y reinicio del proceso de la terminal.

**Problema presentado 2:**

Error en:

```bash
npx tailwindcss init -p
```

debido a la descarga de una versión incompatible (Tailwind CSS v4).

**Solución 2:**

Reinstalación forzada a la rama estable 3.x para garantizar la compatibilidad estructural del `tailwind.config.js`.

```bash
npm install -D tailwindcss@3 postcss autoprefixer
```

---

# 4. Registro de Operaciones y Resolución de Problemas
## Sprint 2 - Backend y Base de Datos

Se estableció el servidor base utilizando **Express.js** y se configuró la arquitectura de la API REST para el módulo de agendamiento.

---

### 4.1. Conexión a MongoDB Atlas y Codificación de URI

Se creó un clúster **M0** en la nube de MongoDB Atlas. Posteriormente se configuró el usuario de la base de datos y la lista de control de acceso por direcciones IP autorizadas.

**Problema presentado:**

Durante la conexión mediante **Mongoose** se produjo un conflicto de autenticación debido a que la contraseña contenía el carácter especial almohadilla (`#`).

El analizador de URLs interpreta este carácter como el inicio de un fragmento (*anchor*), truncando la cadena de conexión e impidiendo la autenticación con el servidor.

**Solución aplicada:**

Se aplicó el estándar **URL Encoding** dentro del archivo `.env`, reemplazando el carácter especial:

```text
#
```

por su equivalente hexadecimal:

```text
%23
```

Adicionalmente, se añadió explícitamente el nombre lógico de la base de datos dentro de la cadena de conexión:

```text
sivet_cloud_db
```

Con ello se evitó que MongoDB almacenara automáticamente la información en la base de datos predeterminada denominada `test`.

---

### 4.2. Configuración del Entorno de Desarrollo (Nodemon)

Para mejorar el flujo de desarrollo se implementó **Nodemon**, permitiendo el reinicio automático del servidor cada vez que se detectan cambios en el código fuente.

**Problema presentado:**

Al intentar ejecutar el servidor apareció el siguiente mensaje:

```text
Missing script: "dev"
```

El archivo `package.json` no contenía un script asociado al entorno de desarrollo.

**Solución aplicada:**

Se agregaron los scripts correspondientes dentro del archivo `package.json` del backend.

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

Con esta configuración fue posible iniciar el servidor utilizando:

```bash
npm run dev
```

obteniendo reinicio automático cada vez que se modifica cualquier archivo del proyecto.

---

### 4.3. Arquitectura MVC y Fallo de Enrutamiento

Con el objetivo de mantener una arquitectura organizada y escalable se implementó el patrón **Modelo - Vista - Controlador (MVC)**.

La estructura quedó dividida en:

- **Models:** Definición de los esquemas mediante Mongoose.
- **Controllers:** Implementación de la lógica de negocio.
- **Routes:** Definición de los endpoints de la API REST.
- **Server:** Punto de entrada del servidor Express.

Esta separación facilita el mantenimiento del proyecto y evita mezclar responsabilidades entre componentes.

**Problema presentado:**

Durante la ejecución del servidor se produjo el siguiente error crítico:

```text
App Crashed:
TypeError: argument handler must be a function
```

Express rechazaba la lectura del archivo de rutas debido a que uno de los controladores no estaba siendo exportado correctamente.

**Causa identificada:**

La función:

```javascript
getAppointments()
```

había sido declarada accidentalmente dentro del bloque de la función:

```javascript
createAppointment()
```

Como consecuencia, Express recibía un valor indefinido en lugar de una función válida para asociar a la ruta correspondiente.

**Solución aplicada:**

Se reorganizó el archivo `appointment.controller.js`, separando ambas funciones para que existieran de forma independiente.

Posteriormente cada controlador fue exportado correctamente mediante:

```javascript
module.exports = {
    createAppointment,
    getAppointments
};
```

Con ello el archivo `appointment.routes.js` pudo importar ambos controladores sin producir errores de ejecución.

---

### 4.4. Integración de la API en el Frontend

Una vez validado el funcionamiento del backend mediante **Thunder Client**, se procedió a desarrollar la integración con la interfaz web.

La comunicación entre frontend y backend se implementó utilizando **JavaScript Vanilla** mediante la función:

```javascript
fetch()
```

El proceso de comunicación sigue el siguiente flujo:

1. El navegador realiza una petición HTTP `GET` hacia el servidor Express.
2. Express consulta MongoDB Atlas utilizando Mongoose.
3. MongoDB devuelve un arreglo de documentos en formato JSON.
4. Express responde al cliente con dicho arreglo.
5. JavaScript procesa la respuesta.
6. El DOM se actualiza dinámicamente creando tarjetas de citas mediante clases utilitarias de Tailwind CSS.

Esta arquitectura permite desacoplar completamente la interfaz gráfica de la lógica del servidor.

---

# 5. Endpoints de la API REST y Contrato de Datos

Para el módulo de Agendamiento se definió un esquema estricto mediante **Mongoose**.

## Entidad: Cita Médica (Appointment)

| Campo | Tipo | Descripción |
|--------|------|-------------|
| patientId | ObjectId | Identificador relacional del paciente |
| veterinarianId | ObjectId | Identificador relacional del veterinario asignado |
| date | Date | Fecha y hora de la consulta en formato ISO 8601 |
| duration | Number | Duración de la consulta en minutos |
| reason | String | Motivo de consulta (máximo 250 caracteres) |
| status | String | Estado actual de la cita |

---

## Rutas Operativas

| Método HTTP | Endpoint | Descripción | Respuesta |
|-------------|----------|-------------|-----------|
| GET | `/api/v1/appointments` | Recupera todas las citas almacenadas en MongoDB Atlas | **200 OK** |
| POST | `/api/v1/appointments` | Inserta una nueva cita validada mediante el esquema BSON | **201 Created** |

---

# 6. Protocolo de Operación Diaria (Reactivación)

Al reiniciar el equipo físico, todos los procesos de **Node.js** se detienen automáticamente. Para continuar el desarrollo del proyecto es necesario volver a iniciar tanto el frontend como el backend en terminales independientes dentro del monorepo.

---

## Terminal 1 - Compilación del Frontend

Ubicarse en la carpeta del cliente:

```bash
cd frontend
```

Instalar las dependencias (solo la primera vez o cuando sea necesario):

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Este proceso se encargará de compilar automáticamente la interfaz web y reflejar cualquier cambio realizado en los archivos del frontend.

---

## Terminal 2 - Servidor Backend y Base de Datos

Ubicarse en la carpeta del servidor:

```bash
cd backend
```

Instalar las dependencias (solo la primera vez o cuando sea necesario):

```bash
npm install
```

Iniciar el servidor Express mediante Nodemon:

```bash
npm run dev
```

---

## Validación del Inicio Correcto

Si la conexión con MongoDB Atlas fue establecida correctamente, la terminal deberá mostrar un mensaje similar al siguiente:

```text
MongoDB Conectado:
ac-pfumxiz-shard-00-00.xxxxxx.mongodb.net
```

Este mensaje confirma que:

- El servidor Express se encuentra en ejecución.
- Mongoose logró autenticarse correctamente.
- La conexión con MongoDB Atlas fue establecida.
- La API REST está disponible para recibir peticiones del frontend.

---

# Flujo General de Ejecución del Proyecto

Cada vez que se continúe el desarrollo del sistema deberá seguirse el siguiente procedimiento:

1. Abrir una terminal para el **Frontend**.

```bash
cd frontend
npm run dev
```

2. Abrir una segunda terminal para el **Backend**.

```bash
cd backend
npm run dev
```

3. Verificar que MongoDB Atlas se haya conectado correctamente.

4. Abrir el navegador y acceder a la aplicación.

---

---

# Cronología del Proyecto

| Fecha | Actividad | Estado |
|--------|-----------|--------|
| Sprint 1 | Creación del repositorio Git | ✅ |
| Sprint 1 | Configuración de GitHub | ✅ |
| Sprint 1 | Instalación de Node.js | ✅ |
| Sprint 1 | Configuración de Tailwind CSS | ✅ |
| Sprint 1 | Organización del Monorepo | ✅ |
| Sprint 2 | Configuración de Express.js | ✅ |
| Sprint 2 | Conexión con MongoDB Atlas | ✅ |
| Sprint 2 | Configuración de Mongoose | ✅ |
| Sprint 2 | Implementación de la arquitectura MVC | ✅ |
| Sprint 2 | Desarrollo de la API REST | ✅ |
| Sprint 2 | Integración Frontend - Backend | ✅ |
| Sprint 3 | Desarrollo del módulo de Agendamiento | 🚧 |
| Sprint 3 | Desarrollo del módulo de Pacientes | ⏳ |
| Sprint 4 | Desarrollo del Historial Clínico | ⏳ |
| Sprint 5 | Desarrollo del Inventario | ⏳ |
| Sprint 6 | Desarrollo del módulo Financiero | ⏳ |
| Sprint 7 | Dashboard Administrativo | ⏳ |
| Sprint 8 | Autenticación y Roles | ⏳ |
| Sprint 9 | Despliegue en la nube | ⏳ |

---

# Nota para el Desarrollador

Este documento debe actualizarse progresivamente al finalizar cada Sprint del proyecto.

Se recomienda documentar:

- Decisiones arquitectónicas.
- Tecnologías incorporadas.
- Cambios estructurales del sistema.
- Problemas encontrados durante el desarrollo.
- Soluciones implementadas.
- Diagramas de base de datos.
- Diagramas UML.
- Nuevos módulos desarrollados.
- Cambios en la API REST.
- Mejoras de rendimiento.
- Buenas prácticas implementadas.

La documentación deberá crecer junto con el proyecto, registrando la evolución de los módulos principales:

- Agendamiento.
- Historial Clínico.
- Gestión de Pacientes.
- Gestión de Veterinarios.
- Inventario.
- Facturación.
- Finanzas.
- Dashboard Administrativo.
- Reportes.
- Gestión de Usuarios y Roles.

Mantener este documento actualizado facilitará el mantenimiento del sistema, la sustentación del proyecto final del programa ADSO - SENA y permitirá conservar un historial técnico completo de las decisiones tomadas durante el desarrollo de SIVET CLOUD.

---

# Historial de Sprints

| Sprint | Estado | Descripción |
|---------|--------|-------------|
| Sprint 1 | ✅ Finalizado | Inicialización del proyecto, configuración de Git, Node.js y Tailwind CSS. |
| Sprint 2 | ✅ Finalizado | Implementación del Backend, conexión con MongoDB Atlas, arquitectura MVC e integración Frontend-Backend. |
| Sprint 3 | 🚧 En desarrollo | Módulo de Agendamiento y evolución de funcionalidades. |

---

# Licencia

Este proyecto fue desarrollado con fines académicos como requisito para optar al título de **Tecnólogo en Análisis y Desarrollo de Software (ADSO)** del **Servicio Nacional de Aprendizaje (SENA)**.

El código podrá continuar evolucionando como un proyecto de software de gestión veterinaria basado en arquitectura SaaS.

> **Última actualización:** Documentación correspondiente a la implementación inicial de la arquitectura del proyecto SIVET CLOUD.