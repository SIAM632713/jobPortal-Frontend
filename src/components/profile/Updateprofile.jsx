import React, {useState} from 'react';
import { X } from 'lucide-react';
import {useUserUpdateMutation} from "@/redux/feature/authAPI/authAPI.js";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
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
        imageFile: "",
        skills:"",
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
                phone:inputForm.phone,
                bio:inputForm.bio,
                resume:imageUrl,
                skills:inputForm.skills,
            }

            await userUpdate({id:user?._id,newData}).unwrap()
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
        <div className="fixed inset-0 backdrop-brightness-25 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
                {/* Close Button using Lucide X */}
                <button
                    onClick={HandleModalclose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    <X size={20} />
                </button>

                {/* Modal Title */}
                <h2 className="text-xl font-semibold mb-5 text-center">Update Profile</h2>

                {/* Form */}
                <form className="space-y-4">
                    <input
                        onChange={handleOnChange}
                        value={inputForm.fullname}
                        name="fullname"
                        type="text"
                        placeholder="Name"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        onChange={handleOnChange}
                        value={inputForm.phone}
                        name="phone"
                        type="text"
                        placeholder="Number"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        onChange={handleOnChange}
                        value={inputForm.bio}
                        name="bio"
                        type="text"
                        placeholder="Bio"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        onChange={handleOnChange}
                        value={inputForm.skills}
                        name="skills"
                        type="text"
                        placeholder="Skills"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        onChange={handleOnChange}
                        name="imageFile"
                        type="file"
                        className="w-full border border-gray-300 rounded px-2 py-1"
                    />

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
                    >
                        {isLoading || Upload ? <ButtonLoader/> : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Updateprofile;
