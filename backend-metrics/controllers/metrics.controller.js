const metricsService = require("../services/metrics.service");

/**
 * GET /api/metrics
 * Query params opcionales:
 *  - equipo
 *  - from
 *  - to
 */
exports.getMetrics = async(req, res) => {
    try {
        const { equipo, from, to } = req.query;

        const data = await metricsService.getMetrics({
            equipo,
            from,
            to
        });

        res.json(data);
    } catch (error) {
        console.error("Error getMetrics:", error);
        res.status(500).json({ error: "Error obteniendo métricas" });
    }
};

/**
 * GET /api/metrics/:equipo
 */
exports.getMetricByEquipo = async(req, res) => {
    try {
        const { equipo } = req.params;

        const metric = await metricsService.getMetricByEquipo(equipo);

        if (!metric) {
            return res.status(404).json({ error: "Equipo no encontrado" });
        }

        res.json(metric);
    } catch (error) {
        console.error("Error getMetricByEquipo:", error);
        res.status(500).json({ error: "Error obteniendo métrica" });
    }
};