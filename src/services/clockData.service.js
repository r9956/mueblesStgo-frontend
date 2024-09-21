import httpClient from '../http-common.js'

const uploadClockData = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return httpClient.post('/clock/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export default uploadClockData;