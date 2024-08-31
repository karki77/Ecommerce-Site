import express from 'express';
import { signup, login, logout, getUsers, getUserProfile, updateUserProfile } from '../controller/user.controller.js';
import { checkAuth, checkAdmin} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", checkAuth, checkAdmin, checkAdmin, getUsers);
router.get("/profile", checkAuth, getUserProfile);
router.put("/profile", checkAuth, updateUserProfile);


export default router;