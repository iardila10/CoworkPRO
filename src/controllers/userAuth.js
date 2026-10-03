//LOGIN
import express from "express"
import { Router } from "express"
import { User } from "../data/database.js"

//CREATE ACCOUNT

export const registerUser = async (req, res) => {
    try {
        const {name, email, phone, password} = req.body
        if (!name || !email || !phone || !password){
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
        res.status(500).json({
            message: "Error"
        })
    }
};

//LOG IN
export const loginUser = async (req, res) => {
    const {email, password} = req.body                
    if (!email || !password) {
        return res.status(400).json({
            message: "Missing fields"
        })
    }

    const searchUser = await User.SearchforEmailandUser(email, password)

    if (!searchUser) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const goodPassword = await User.compararPassword(password, user.password);
    if (!goodPassword) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

}
