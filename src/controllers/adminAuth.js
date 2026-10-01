import express from "express"
import { Router } from "express"
const router = Router()

router.post("/register", async (req, res) => {
    try {
        const {name, email, phone, password} = req.body
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: "Missing fields"
            })
        }

        //Si ya existe..
    }

    catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
})