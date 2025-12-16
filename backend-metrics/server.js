const express = require("express");
const cors = require("cors");

const metricsController = require("./controllers/metrics.controller");
const ejecucionController = require("./controllers/ejecucion.controller");

const app = express();
app.use(cors());
app.use(express.json());

/* ==========================
   ROUTES — API GATEWAY SIMULADO
   ========================== */

// Calidad
app.get("/api/metrics", metricsController.getMetrics);
app.get("/api/metrics/:equipo", metricsController.getMetricByEquipo);

// Ejecución
app.get("/api/ejecucion", ejecucionController.getEjecuciones);
app.get("/api/ejecucion/:equipo", ejecucionController.getEjecucionByEquipo);

/* ========================== */

app.listen(3000, () =>
    console.log("Backend levantado en http://localhost:3000")
);