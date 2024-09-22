import httpClient from '../http-common.js';

// Encuentra un empleado por Id
const get = (id) => {
    return httpClient.get(`/employees/${id}`);
};

// Obtiene a todos los empleados
const getAll = () => {
    return httpClient.get("/employees/getAll");
};

// Agrega un nuevo empleado
const create = (data) => {
    return httpClient.post("/employees/add", data);
};

// Actualiza un empleado por su Id
const update = (id, data) => {
    return httpClient.put(`/employees/update/${id}`, data);
};

// Elimina un empleado por su Id
const remove = (id) => {
    return httpClient.delete(`/employees/delete/${id}`);
};

const employeeService = {
    get,
    getAll,
    create,
    update,
    remove
};

export default employeeService;