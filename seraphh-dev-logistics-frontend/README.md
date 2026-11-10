# Frontend React - Sistema Internacional de Logística y Transporte (seraphh-dev)

Este proyecto está configurado con Vite, React, y TailwindCSS. Incluye un manifiesto modular para su despliegue en OpenShift, configurado para escalar y mantener los estándares operativos.

## Estructura del proyecto
- `src/` - Código fuente de React
- `Dockerfile` - Construcción multi-stage utilizando Nginx (modificado al puerto 8080 para OpenShift).
- `openshift-deployment.yaml` - Template con `DeploymentConfig`, `Service` y `Route` para OpenShift.

## Ejecutar en desarrollo
1. Instalar dependencias: `npm install`
2. Ejecutar entorno de desarrollo: `npm run dev`

## Despliegue en OpenShift
Para aplicar el manifiesto de despliegue en tu namespace `seraphh-dev`:
```bash
oc project seraphh-dev
oc apply -f openshift-deployment.yaml
```
