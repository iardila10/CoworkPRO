import express from "express"
import { Router } from "express"

import { RegisterAdmin, loginAdmin } from "../controllers/adminAuth.js"

const router = Router()

router.get("/register", RegisterAdmin)
router.get("/login", loginAdmin)