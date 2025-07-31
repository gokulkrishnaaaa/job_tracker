import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(!email || !password){
        setError("Please enter both email and password");
        return;
    }

    setError('');
    console.log("Form Submitted :", {email, password});
  }

  return (
    <AuthLayout title="Login">
      <form 
        onSubmit={handleSubmit}
        action="" 
        className="flex flex-col gap-4"
      >
        {error && <p className="text-center text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}

        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={(e)=> setPassword(e.target.value)}
        />
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
