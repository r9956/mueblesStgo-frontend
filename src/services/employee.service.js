import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get("employees/getAll");
}
const create = data => {
    return httpClient.post("/employees/add", data);
}

const employeeService = {
    getAll,
    create
};

export default employeeService;