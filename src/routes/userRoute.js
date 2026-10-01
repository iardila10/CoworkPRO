import { Router } from "express";
const router = Router()

import { registerUser, loginUser } from "../controllers/userAuth";

//Register route
router.post("/register", registerUser)

//Login route
router.post("/login", loginUser)