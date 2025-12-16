const ejecucionService = require("../services/ejecucion.service");

/**
 * GET /api/ejecucion
 */
exports.getEjecuciones = async(req, res) => {
    try {
        const { equipo, from, to } = req.query;

        const data = await ejecucionService.getEjecuciones({
            equipo,
            from,
            to
        });

        res.json(data);
    } catch (error) {
        console.error("Error getEjecuciones:", error);
        res.status(500).json({ error: "Error obteniendo ejecuciones" });
    }
};

/**
 * GET /api/ejecucion/:equipo
 */
exports.getEjecucionByEquipo = async(req, res) => {
    try {
        const { equipo } = req.params;

        const ejecucion = await ejecucionService.getEjecucionByEquipo(equipo);

        if (!ejecucion) {
            return res.status(404).json({ error: "Equipo no encontrado" });
        }

        res.json(ejecucion);
    } catch (error) {
        console.error("Error getEjecucionByEquipo:", error);
        res.status(500).json({ error: "Error obteniendo ejecución" });
    }
};