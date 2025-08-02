import prisma from "../db/db.js";

export const createJob = async (req, res) => {
  try {
    const { company, position, status } = req.body;

    if (!company || !position) {
      return res
        .status(400)
        .json({ message: "Company and position are required" });
    }

    const job = await prisma.job.create({
      data: {
        company,
        position,
        status: "pending",
        userId: req.user.id,
      },
    });
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(201).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { company, position } = req.body;
    const { id } = req.params;

    let job = await prisma.job.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!job || job.userId !== req.user.id) {
      return res.status(404).json({ message: "Job not found" });
    }

    job = await prisma.job.update({
      where: {
        id: job.id,
      },
      data: { company, position },
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!job || job.userId !== req.user.id) {
      return res.status(404).json({ message: "Job not found" });
    }

    await prisma.job.delete({
      where: {
        id: job.id,
      },
    });
    res.status(200).json({ message: "Jobs deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
