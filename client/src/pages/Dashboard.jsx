import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import JobForm from "./JobForm.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/job/list");
      console.log(res);
      setJobs(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this job?");
    if (confirmDelete) {
      try {
        const res = await api.delete(`/job/delete/${id}`);
        console.log("Deleted:", res.data);
        fetchJobs(); // refresh the list
      } catch (error) {
        console.log("Delete error:", error.response?.data || error.message);
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Dashboard
      </h1>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <JobForm
         onJobCreated={fetchJobs}
         editingJob={editJob}
      />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-betweenx"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {job.position ? job.position : "Nil"}
                </h2>
                <p className="text-gray-600">
                  {job.company ? job.company : "Nil"}
                </p>
                <p className="mt-1 text-sm text-gray-500 capitalize">
                  Status: <span className="font-medium">{job.status}</span>
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setEditJob(job)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteJob(job.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Jobs not found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
