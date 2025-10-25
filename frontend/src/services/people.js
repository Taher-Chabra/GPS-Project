import { api } from "../lib/api";

//fetch captcha code
const fetchCaptcha = async () => {
   const response = await api.get('/people/captcha');
   return response;
}

// register client
const registerClient = async(userData) => {
   const response = await api.post('/people/register', userData);
   return response;
}

// login client
const loginClient = async(userData) => {
   const response = await api.post('/people/login', userData);
   return response;
}

// logout client
const logoutClient = async() => {
   const response = await api.post('/people/logout');
   return response;
}

export { fetchCaptcha, registerClient, loginClient, logoutClient };