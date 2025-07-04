import User from '../models/user.js';
import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({path:path.join(__dirname,'../config/jwt.env')})



router.post('/register', async (req,res) =>{
    try{
        const hashedUser = await bcrypt.hash(req.body.password,10)
        const user = await User.create({
            username : req.body.username,
            password: hashedUser,
        })
        console.log("registered correctly")
        res.status(201).json({message:"User Registerd",user})
    }catch(err){console.log(err)
        res.status(500).json({message:err.message})
    }
})
router.post('/signIn', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: "Invalid Username" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token = jwt.sign( //auth stuff
            { id: user._id },
            process.env.JWT_KEY,
            { expiresIn: "30d" }
        );
        res.json({ // sending username and encrypted token
            id: user._id,
            username: user.username,
            token: token,
        });
        console.log("succesfully added person")
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});
export default router