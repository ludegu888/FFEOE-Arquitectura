import express from 'express';
import { register, collectDefaultMetrics } from 'prom-client';

const app = express();
const port = process.env.PORT || 3000;

// Esto activa la recolección de métricas por defecto (CPU, memoria, etc.)
collectDefaultMetrics();

// Endpoint para que Prometheus lea las métricas
app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.get('/', (_req, res) => {
  res.send('¡Servidor Node.js + TypeScript funcionando para FFEOE-Arquitectura!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Métricas disponibles en http://localhost:${port}/metrics`);
});
