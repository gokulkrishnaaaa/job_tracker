import express from "express";
import { createJob, getJobs, updateJob, deleteJob } from "../controllers/jobController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createJob);
router.get("/list", authMiddleware, getJobs);
router.put("/update/:id", authMiddleware, updateJob);
router.delete("/delete/:id", authMiddleware, deleteJob);

export default router;