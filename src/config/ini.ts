import { User, TYPE_USER } from "../models/user";

export const initialAdmin: User = {
    name: "Administrador",
    type: TYPE_USER,
    username: "admin",
    pass: "admin"
};