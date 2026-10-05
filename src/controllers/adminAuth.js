import express from "express"
import { User } from "../data/database.js";

//CREATE ACCOUNT

export const RegisterAdmin = async (req, res) => {
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

//LOG IN

export const loginAdmin = async (req, res) => {
    const {email, password} = req.body                
    if (!email || !password) {
        return res.status(400).json({
            message: "Missing fields"
        })
    }

    const searchAdmin = await User.SearchforEmailandUser(email, password)

    if (!searchAdmin) {
      return res.status(401).json({ message: 'Incorrect credentialss' });
    }

    const goodPassword = await User.comparePassword(password, Userser.password);
    if (!goodPassword) {
      return res.status(401).json({ message: 'Incorrect credentials' });
    }

}
