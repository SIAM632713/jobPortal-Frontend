import React, {useState} from 'react';
import { X } from 'lucide-react';
import {useUserUpdateMutation} from "@/redux/feature/authAPI/authAPI.js";
import ButtonLoader from "@/components/buttonLoader/buttonLoader.jsx";
import {useSelector} from "react-redux";

const Updateprofile = ({ HandleModalclose, isModalOpen,refetch }) => {
    if (!isModalOpen) return null;

    const { user } = useSelector((state) => state.auth);
    const [userUpdate,{isLoading}]=useUserUpdateMutation()
    const [Upload,setUpload]=useState()

    const [inputForm, setinputForm] = useState({
        fullname: "",
        phone: "",
        bio: "",
        resume: "",
        skills:"",
    });

    const handleOnChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === "file") {
            setinputForm(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setinputForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        setUpload(true);
        try {
            const formData = new FormData();
            formData.append("fullname", inputForm.fullname);
            formData.append("phone", inputForm.phone);
            formData.append("bio", inputForm.bio);
            formData.append("skills", inputForm.skills);

            if (inputForm.resume) {
                formData.append("resume", inputForm.resume);
            }

            await userUpdate({id:user?._id,formData}).unwrap()
            alert("Profile Update successfully")
            refetch()
            HandleModalclose()
        }catch(err) {
            console.log(err);
        }finally {
            setUpload(false);
        }
    }

    return (
        <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-semibold text-gray-800">Update Profile</h2>
                    <button
                        onClick={HandleModalclose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            onChange={handleOnChange}
                            value={inputForm.fullname}
                            name="fullname"
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            onChange={handleOnChange}
                            value={inputForm.phone}
                            name="phone"
                            type="text"
                            placeholder="Enter your phone number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <input
                            onChange={handleOnChange}
                            value={inputForm.bio}
                            name="bio"
                            type="text"
                            placeholder="Enter your bio"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                        <input
                            onChange={handleOnChange}
                            value={inputForm.skills}
                            name="skills"
                            type="text"
                            placeholder="Enter your skills (comma separated)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                        <input
                            onChange={handleOnChange}
                            name="resume"
                            type="file"
                            accept="image/*,.pdf"
                            className="w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        disabled={isLoading || Upload}
                        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {isLoading || Upload ? <ButtonLoader/> : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Updateprofile;