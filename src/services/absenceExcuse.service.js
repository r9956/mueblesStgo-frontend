import httpClient from '../http-common.js';

const absenceExcuse = (rut, fromDate, toDate, file) => {
    const formData = new FormData();
    formData.append('rut', rut);
    formData.append('fromDate', fromDate);
    formData.append('toDate', toDate);
    formData.append('file', file);

    return httpClient.post('/excuse/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default absenceExcuse;
