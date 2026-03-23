# 🚀 FFEOE-Arquitectura: Despliegue de Aplicación Escalable

Este proyecto consiste en una aplicación Node.js con TypeScript empaquetada en Docker, con un ciclo de vida completo de DevOps que incluye CI/CD y monitorización en tiempo real.

## 🛠️ Tecnologías Utilizadas
* **Lenguaje:** Node.js con TypeScript.
* **Contenedores:** Docker & Docker Compose.
* **CI/CD:** GitHub Actions.
* **Cloud Hosting:** Render.
* **Monitorización:** Prometheus & Grafana.
* **Testing:** Jest.

## 🚀 Cómo Ejecutar Localmente
1. Clonar el repositorio:
   `git clone https://github.com/ludegu888/FFEOE-Arquitectura.git`
2. Instalar dependencias:
   `npm install`
3. Ejecutar en modo desarrollo:
   `npm run dev`

## 📦 Construcción y Despliegue (Docker)
Para construir la imagen localmente:
`docker build -t mi-app-node .`

Para levantar todo el sistema (App + Monitorización):
`docker-compose up -d`

## ⚙️ Configuración del Pipeline CI/CD
El proyecto incluye un flujo en GitHub Actions (`.github/workflows/main.yml`) que:
1. Se dispara en cada `push` a la rama `main`.
2. Levanta un entorno Node.js.
3. Instala dependencias y ejecuta los **Tests Unitarios**.
4. Si los tests pasan, se activa el Webhook de **Render** para el despliegue automático.

## 📊 Monitorización, Dashboards y Alertas
Se ha implementado un stack de observabilidad:
* **Prometheus:** Recolecta métricas desde el endpoint `/metrics` de la aplicación en la nube.
* **Grafana:** Visualiza el consumo de CPU, Memoria y tráfico.
* **Alertas:** Configuradas para notificar picos de consumo de recursos.

## 🔒 Seguridad y Buenas Prácticas
* **Multistage Builds:** Uso de Docker multi-etapa para reducir el tamaño de la imagen y la superficie de ataque.
* **Archivos Ignore:** Uso de `.gitignore` y `.dockerignore` para no subir credenciales ni basura de `node_modules`.
* **Tests Automatizados:** Ningún código llega a producción sin pasar las pruebas de calidad.

## 🗺️ Diagrama de Arquitectura
```text
[ Usuario ] ---> [ Render Load Balancer ] ---> [ Contenedor Node.js (Puerto 3000) ]
                                                            |
                                                            v
[ Grafana ] <--- [ Prometheus ] <------------------- [ Endpoint /metrics ]

