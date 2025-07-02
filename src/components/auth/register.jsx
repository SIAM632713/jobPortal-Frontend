import React, {useState} from 'react';
import { Input } from "@/components/ui/input"
import {Link, useNavigate} from "react-router-dom";
import {useRegisterUserMutation} from "@/redux/feature/authAPI/authAPI.js";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import ButtonLoader from "@/components/buttonLoader/buttonLoader.jsx";

const Register = () => {

    const navigate=useNavigate();
    const [registerUser,{isLoading}]=useRegisterUserMutation()
    const [upload,setUpload]=useState(false)

    const [inputForm, setinputForm] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        role: "",
    });

    const handleOnChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setinputForm(prev => ({ ...prev, imageFile: files[0] }));
        } else {
            setinputForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        setUpload(true);
        try {
            let imageUrl = "";

            if (inputForm.imageFile) {
                const formData = new FormData();
                formData.append("image", inputForm.imageFile);

                const imageUploadResponse = await axios.post(`${getBaseURL()}/api/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                imageUrl = imageUploadResponse.data.url;
            }

            const newData={
                fullname:inputForm.fullname,
                email:inputForm.email,
                phone:inputForm.phone,
                password:inputForm.password,
                profilePhoto:imageUrl,
                role:inputForm.role,
            }

            await registerUser(newData).unwrap()
            alert("Register successfully")
            setinputForm({
                fullname: "",
                email: "",
                phone: "",
                password: "",
                Image: null,
                role: "",
            })
            navigate("/login")
        }catch(err) {
         console.log(err);
        }finally {
            setUpload(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-[700px] mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            value={inputForm.fullname}
                            onChange={handleOnChange}
                            name="fullname"
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            value={inputForm.email}
                            onChange={handleOnChange}
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                            value={inputForm.phone}
                            onChange={handleOnChange}
                            name="phone"
                            type="number"
                            placeholder="Enter your phone number"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            value={inputForm.password}
                            onChange={handleOnChange}
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">profile</label>
                        <Input onChange={handleOnChange} id="picture" type="file" name="Image" />
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                        <label className="flex items-center space-x-1">
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={inputForm.role === "student"}
                                onChange={handleOnChange}
                            />
                            <span>Student</span>
                        </label>

                        <label className="flex items-center space-x-1">
                            <input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={inputForm.role === "recruiter"}
                                onChange={handleOnChange}
                            />
                            <span>Recruiter</span>
                        </label>
                    </div>


                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800"
                    >
                        {isLoading || upload ? <ButtonLoader/> : 'Signup'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
