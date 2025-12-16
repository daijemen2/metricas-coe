// repositories/metrics.repository.js

const metricsData = require("../data/metrics.data");

class MetricsRepository {
    /**
     * Simula un DynamoDB Scan
     */
    async findAll() {
        // en Dynamo esto sería un ScanCommand
        return [...metricsData];
    }

    /**
     * Simula un GetItem por PK (equipo)
     */
    async findByEquipo(equipo) {
        if (!equipo) return null;

        return metricsData.find(
            (m) => m.equipo.toLowerCase() === equipo.toLowerCase()
        );
    }

    /**
     * Simula un Query por rango de fechas (GSI)
     */
    async findByDateRange(from, to) {
        const fromDate = from ? new Date(from) : null;
        const toDate = to ? new Date(to) : null;

        return metricsData.filter((m) => {
            const current = new Date(m.timestamp);

            if (fromDate && current < fromDate) return false;
            if (toDate && current > toDate) return false;

            return true;
        });
    }
}

module.exports = new MetricsRepository();