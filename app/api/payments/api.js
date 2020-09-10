const axios = require('axios');

const {
	PAYU_URL
} = process.env;

const api = axios.create({
	baseURL: `${PAYU_URL}`,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	},
});

api.interceptors.request.use(request => {
	console.log('Starting Request', request)
	return request
  })
  
  api.interceptors.response.use(response => {
	console.log('Response:', response)
	return response
  })

/* api.interceptors.request.use((request) => {
    // write down your request intercept.
    return AxiosLogger.requestLogger(request, {
        prefixText: 'your prefix',
        dateFormat: 'HH:MM:ss',
        status: false,
		headers: true,
		data: true
    });
});

 */

module.exports = {
    api
};
