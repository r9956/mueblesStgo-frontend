import httpClient from '../http-common.js';

// Encuentra un pago por Id
const get = (id) => {
    return httpClient.get(`/paycheck/${id}`);
};

// Obtiene a todos los pagos
const getAll = () => {
    return httpClient.get("/paycheck/getAll");
};

// Obtiene a todos los pagos filtrados por mes y año
const dateFilter = (year, month) => {
    return httpClient.get("/paycheck/dateFilter", {
        params: {
            year: year,
            month: month
        }
    });
};

// Obtiene a todos los pagos filtrados rut
const rutFilter = (rut) => {
    return httpClient.get("/paycheck/rutFilter", {
        params: {
            rut: rut
        }
    });
};

const paycheckService = {
    get,
    getAll,
    dateFilter,
    rutFilter
};

export default paycheckService;