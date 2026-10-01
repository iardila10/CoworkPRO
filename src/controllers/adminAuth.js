import express from "express"
<<<<<<< HEAD
import { User } from "../data/database";

//CREATE ACCOUNT

const RegisterUser = async (req, res) => {
    try {
        const {name, email, phone, password} =  req.body
=======
import { Router } from "express"
const router = Router()

router.post("/register", async (req, res) => {
    try {
        const {name, email, phone, password} = req.body
>>>>>>> a41c2048d708f3b6908cabc18741f9c79725e812
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: "Missing fields"
            })
        }

<<<<<<< HEAD
        const Exists = await User.exists(email, password)
        if (Exists) {
            return res.status(400).json({
                message: "Account already registered"
            })
        }
}

catch (error) {
    return res.status(400).json({
        error: "ERROR"
    })
}}
=======
        //Si ya existe..
    }

    catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
})
>>>>>>> a41c2048d708f3b6908cabc18741f9c79725e812
