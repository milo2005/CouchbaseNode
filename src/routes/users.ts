import { Router } from "express";
import { login } from "../controllers/users/login";

const router: Router = Router();

router.post("/login", login);

export default router;
