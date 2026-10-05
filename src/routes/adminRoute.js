import express from "express"
import { Router } from "express"

import { RegisterAdmin, loginAdmin } from "../controllers/adminAuth.js"

const router = Router()

router.post("/register", RegisterAdmin)
router.post("/login", loginAdmin)