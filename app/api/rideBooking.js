import client from "./client";

const bookRide = (...props) => {
    client.get("/requestride", ...props);
}

export default {
    bookRide
};