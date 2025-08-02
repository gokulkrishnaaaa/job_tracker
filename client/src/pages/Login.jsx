import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import api from "../utils/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const Login = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState :{errors},
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async (data)=>{

    try {
      const res = await api.post("/auth/login", data);
      console.log("Response data:", res.data);
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard")

    } catch (error) {
      console.log(err.response.data);
      setError(err.response.data.message || "Invalid email or password");
    }
  }

  return (
    <AuthLayout title="Login">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        action="" 
        className="flex flex-col gap-4"
      >

        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 rounded"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          {...register("password")}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        Don't have an accout ?{" "}
        <Link to="/register" className="text-blue-600">
          {" "}
          Register{" "}
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
