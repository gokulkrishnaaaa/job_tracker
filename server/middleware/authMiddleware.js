import jwt from 'jsonwebtoken';
import prisma from "../db/db.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async(req, res, next)=>{
    const authHeader =req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({
            where : {id: decoded.id}
        })

        if (!user) {
        return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Token not valid" });
    }
}