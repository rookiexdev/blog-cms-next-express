import { Router } from "express";
import { getUserInfo } from "../controllers/user.controllers";
import { isAuthenticated } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", isAuthenticated, getUserInfo);

export default router;
