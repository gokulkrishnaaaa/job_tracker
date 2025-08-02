import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import api from "../utils/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  name: yup
        .string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),

  email : yup
          .string()
          .required("Email is required")
          .email("Enter a valid email"),

  password : yup
              .string()
              .required("Password is required")
              .min(6, "Password must be at least 6 characters")
})

const Register = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState : {errors},
  } = useForm({
    resolver : yupResolver(registerSchema)
  });
  
  const onSubmit = async(data)=>{
    try {
      const res = await api.post("/auth/register", {
        name : data.name,
        email : data.email,
        password : data.password,
      });
      console.log("Response Data", res.data);
      navigate("/login");
    } catch (error) {
      console.log(err.response.data);
      setError(err.response.data.message || "Something went wrong");
    }
  }

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input 
          type="text"
          placeholder="Name" 
          className="border p-2 rounded"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        Already have an account ?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
