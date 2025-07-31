import React from 'react'
import{ Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const Register = () => {
  return (
    <AuthLayout title="Register">
        <form action="" className='flex flex-col gap-4'>
            <input type="text" placeholder='Name' className='border p-2 rounded' />
            <input type="email" placeholder='Email' className='border p-2 rounded' />
            <input type="password" placeholder='Password' className='border p-2 rounded' />
            <button type='submit' className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Register
            </button>
        </form>
        <p className="text-center mt-4 text-sm">
            Already have an account ? <Link to="/login" className='text-blue-600'>Login</Link>
        </p>

    </AuthLayout>    
  )
}

export default Register
