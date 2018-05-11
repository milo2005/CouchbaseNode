import { ConfigI } from "./cfg";

const CONFIG_DEV: ConfigI = {
    database: {
        host: "localhost",
        bucket: "test-words",
        username: "admin",
        password: "123456"
    }
};


const CONFIG_PROD: ConfigI = {
    database: {
        host: "localhost",
        bucket: "test-words",
        username: "admin",
        password: "123456"
    }
};

const env = process.env.NODE_ENV || "development";
export const config = env == "development" ? CONFIG_DEV : CONFIG_PROD;