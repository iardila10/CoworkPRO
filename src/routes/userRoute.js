import { Router } from "express";
const router = Router()

import { registerUser, loginUser } from "../controllers/userAuth.js";

//Register route
router.post("/register", registerUser)

//Login route
router.get("/login", loginUser)