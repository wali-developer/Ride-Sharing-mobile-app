import client from "./client";

const register = (fullName, email, password) => client.post("/user/register", { fullName, email, password });

export default {
    register
};