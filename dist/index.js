"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prom_client_1 = require("prom-client");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Esto activa la recolección de métricas por defecto (CPU, memoria, etc.)
(0, prom_client_1.collectDefaultMetrics)();
// Endpoint para que Prometheus lea las métricas
app.get('/metrics', async (_req, res) => {
    try {
        res.set('Content-Type', prom_client_1.register.contentType);
        res.end(await prom_client_1.register.metrics());
    }
    catch (err) {
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
