import { formsApi } from "../lib/formsApi";

//fetch captcha code
const fetchCaptcha = async () => {
   const response = await formsApi.get('/people/captcha');
   return response;
}

// register client
const registerClient = async(userData) => {
   const response = await formsApi.post('/people/register', userData);
   return response;
}

// login client
const loginClient = async(userData) => {
   const response = await formsApi.post('/people/login', userData);
   return response;
}

// logout client
const logoutClient = async() => {
   const response = await formsApi.post('/people/logout');
   return response;
}

export { fetchCaptcha, registerClient, loginClient, logoutClient };