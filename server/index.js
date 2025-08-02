import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes)
app.get("/", (req, res)=>{
    res.send("API is running");
}); 

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    
})