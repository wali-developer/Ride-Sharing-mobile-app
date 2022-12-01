import { create } from "apisauce";

const apiClient = create({
    // baseURL: "https://rid-sharing-api.herokuapp.com",
    baseURL: "http://192.168.10.8:3001",
    headers: { 'Accept': 'application/json' }

});


export default apiClient;