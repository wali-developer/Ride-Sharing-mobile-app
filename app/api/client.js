import { create } from "apisauce";

const apiClient = create({
    baseURL: "https://rid-sharing-api.herokuapp.com",
});

export default apiClient;