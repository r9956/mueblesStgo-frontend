import httpClient from '../http-common.js';

// Genera una nueva planilla de sueldos
const generatePayroll = (year, month) => {
    return httpClient.post("/payroll/generate", null, {
      params: { year, month },
      responseType: 'text'
    });
  };
  

const payrollService = {
    generatePayroll
};

export default payrollService;