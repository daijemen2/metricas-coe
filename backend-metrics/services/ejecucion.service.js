const ejecucionRepository = require("../repositories/ejecucion.repository");

class EjecucionService {
    async getEjecuciones({ equipo, from, to }) {
        if (equipo) {
            const item = await ejecucionRepository.findByEquipo(equipo);
            return item ? [item] : [];
        }

        if (from || to) {
            return ejecucionRepository.findByDateRange(from, to);
        }

        return ejecucionRepository.findAll();
    }

    async getEjecucionByEquipo(equipo) {
        return ejecucionRepository.findByEquipo(equipo);
    }
}

module.exports = new EjecucionService();