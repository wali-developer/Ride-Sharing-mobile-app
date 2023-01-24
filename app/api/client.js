import { create } from "apisauce";

const apiClient = create({
    // baseURL: "https://rid-sharing-api.herokuapp.com",
    baseURL: "http://192.168.1.19:3001",
    headers: { 'Accept': 'application/json' }

});


export default apiClient;