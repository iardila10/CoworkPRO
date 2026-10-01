import express from "express"
import { User } from "../data/database";

//CREATE ACCOUNT

const RegisterUser = async (req, res) => {
    try {
        const {name, email, phone, password} =  req.body
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: "Missing fields"
            })
        }

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