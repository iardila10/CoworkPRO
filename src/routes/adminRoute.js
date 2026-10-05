import express from "express"
import { Router } from "express"

import { RegisterAdmin, loginAdmin } from "../controllers/adminAuth.js"

const router = Router()

//Register route
router.post("/register", RegisterAdmin)

//Login route
router.post("/login", loginAdmin)