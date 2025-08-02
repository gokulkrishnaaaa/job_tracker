import prisma from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async(req, res)=>{
    const {name, email, password} = req.body;

    try {

        const existingUser = await prisma.user.findUnique({
            where : {email} 
        });
        
        if(existingUser){
            return res.status(400).json({message: 'User already exists'})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data : {name, email, password: hashPassword},
        });
        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json({message: "User registered successfully", userWithoutPassword});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
}

export const loginUser = async(req, res) =>{
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where : {email}
        });

        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"});
        }

        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "1d"});
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({message:"Login successful", token, userWithoutPassword});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error"});
    }
}