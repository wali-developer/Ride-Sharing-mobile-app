import client from "./client";

const register = (name, email, password) => client.post("/user/register", { name, email, password });

export default {
    register
};