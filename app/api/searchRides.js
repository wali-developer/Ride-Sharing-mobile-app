import client from "./client";

const searchRides = (goingfrom, goingto) => {
    client.get("/publishride", { goingfrom, goingto });
}

export default {
    searchRides
};