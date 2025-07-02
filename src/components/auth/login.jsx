import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form"
import {useLoginUserMutation} from "@/redux/feature/authAPI/authAPI.js";
import {useDispatch} from "react-redux";
import {setUser} from "@/redux/feature/authAPI/authSlice.jsx";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/buttonLoader/buttonLoader.jsx";


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser,{isLoading}]=useLoginUserMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit =async (data) => {
        try {
            const response=await loginUser(data).unwrap()
            const {user}=response
            dispatch(setUser({user}))
            navigate("/")
        }catch(err){
            console.log(err)
            toast.error("Login failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-[700px] mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Login</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            {...register("email", { required: "Valid email is required" })}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            {...register("password", { required: "Valid password is required" })}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    <button
                        onClick={handleSubmit(onSubmit)}
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800"
                    >
                        {isLoading ? <ButtonLoader/>:'Login'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;