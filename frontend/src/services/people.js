import { api } from "../lib/api";

//fetch captcha code
const fetchCaptcha = async () => {
   const response = await api.get('/people/captcha');
   return response;
}

// register user
const registerUser = async(userData) => {
   const response = await api.post('/people/register', userData);
   return response;
}

// login user
const loginUser = async(userData) => {
   const response = await api.post('/people/login', userData);
   return response;
}

export { fetchCaptcha, registerUser, loginUser };