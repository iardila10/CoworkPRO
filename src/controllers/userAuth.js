//LOGIN
import express from "express"
import { Router } from "express"
const router = Router()

export const registerUser = router.post("/register", async (req, res) => {
    try {
        const {name, email, phone, password} = req.body
        if (!name || !email || !phone || !password){
            return res.status(400).json({
                message: "Missing fields"
            })
        }

        const Exists = await data.find(d = d.name)
        //Si ya existe..
    }
    catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
})


export const loginUser = router.post("/login", async (req, res) => {
    try {
        const {name, phone, email, password} = req.body
        if (!name || !phone || !email || !password) {
            return res.status(400).json({
                message: "Incorrect credencials"
            })
        }

    } 

    catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
})