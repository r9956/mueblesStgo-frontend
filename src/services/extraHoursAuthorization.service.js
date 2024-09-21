import httpClient from '../http-common.js';

const extraHourAuthorization = (rut, date, file) => {
    const formData = new FormData();
    formData.append('rut', rut);
    formData.append('date', date);
    formData.append('file', file);

    return httpClient.post('/auth/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default extraHourAuthorization;
