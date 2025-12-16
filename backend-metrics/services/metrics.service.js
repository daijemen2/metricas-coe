const metricsRepository = require("../repositories/metrics.repository");

class MetricsService {

    async getMetrics({ equipo, from, to }) {
        if (equipo) {
            const item = await metricsRepository.findByEquipo(equipo);
            return item ? [item] : [];
        }

        if (from || to) {
            return metricsRepository.findByDateRange(from, to);
        }

        return metricsRepository.findAll();
    }

    async getMetricByEquipo(equipo) {
        const metric = await metricsRepository.findByEquipo(equipo);
        if (!metric) return null;

        // 🔥 AQUÍ ESTABA LO QUE FALTABA
        const resumen = metric.resumen || [];

        const manual = resumen.filter(([name]) =>
            name.toLowerCase().includes("resolucion") ||
            name.toLowerCase().includes("deteccion") ||
            name.toLowerCase().includes("gherkin") ||
            name.toLowerCase().includes("cobertura")
        );

        const automatizacion = resumen.filter(([name]) =>
            name.toLowerCase().includes("automatizacion") ||
            name.toLowerCase().includes("ejecucion") ||
            name.toLowerCase().includes("github")
        );

        const pipelines = resumen.filter(([name]) =>
            name.toLowerCase().includes("pipeline")
        );

        return {
            equipo: metric.equipo,
            tribu: metric.tribu,
            coe: metric.coe,
            puntuacion: metric.puntuacion,
            detalle: {
                manual,
                automatizacion,
                pipelines
            }
        };
    }
}

module.exports = new MetricsService();