// repositories/ejecucion.repository.js

const ejecucionData = require("../data/ejecucion.data");

class EjecucionRepository {
    async findAll() {
        return [...ejecucionData];
    }

    async findByEquipo(equipo) {
        if (!equipo) return null;

        return ejecucionData.find(
            (e) => e.equipo.toLowerCase() === equipo.toLowerCase()
        );
    }

    async findByDateRange(from, to) {
        const fromDate = from ? new Date(from) : null;
        const toDate = to ? new Date(to) : null;

        return ejecucionData.filter((e) => {
            const current = new Date(e.timestamp);

            if (fromDate && current < fromDate) return false;
            if (toDate && current > toDate) return false;

            return true;
        });
    }
}

module.exports = new EjecucionRepository();