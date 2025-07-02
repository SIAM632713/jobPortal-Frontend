import React, {useEffect, useState} from 'react';
import {ArrowLeft, X} from "lucide-react";
import {useGetAllcompanyQuery, useUpdateCompanyMutation} from "@/redux/feature/companyAPI/companyAPI.js";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {Link, useParams} from "react-router-dom";
import ButtonLoader from "@/components/buttonLoader/buttonLoader.jsx";

const EditCompany = () => {

    const {id}=useParams();
    const [updateCompany,{isLoading}]=useUpdateCompanyMutation(id)
    const {data}=useGetAllcompanyQuery()
    const [Upload,setUpload]=useState()

    const [inputForm, setinputForm] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        imageFile:""
    });

    useEffect(() => {
      if(data?.data){
          const company=data?.data.find(item=>item._id===id)
          if(company){
              setinputForm({
                  name : company.name || "",
                  description:company.description || "",
                  website :company.website || "",
                  location : company.location || "",
                  imageFile:company.logo || ""
              })
          }
      }
    },[data,id])

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
                name:inputForm.name,
                description:inputForm.description,
                website:inputForm.website,
                location:inputForm.location,
                logo:imageUrl,
            }

            await updateCompany({id,newData:newData}).unwrap()
            alert("Company Updated Successfully")
            setinputForm({
                name: "",
                description: "",
                website: "",
                location: "",
                imageFile:""
            })
        }catch(err) {
            console.log(err);
        }finally {
            setUpload(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-[1000px] rounded-2xl shadow-lg p-10">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                    <Link to="/dashboard/company" className="p-2 rounded hover:bg-gray-100">
                        <ArrowLeft size={20}/>
                    </Link>
                    <h2 className="text-xl font-semibold">Update Company</h2>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Company Name</label>
                            <input
                                value={inputForm.name}
                                onChange={handleOnChange}
                                name="name"
                                type="text"
                                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-black"
                                placeholder="Company Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <input
                                value={inputForm.description}
                                onChange={handleOnChange}
                                name="description"
                                type="text"
                                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-black"
                                placeholder="Description"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Website</label>
                            <input
                                value={inputForm.website}
                                onChange={handleOnChange}
                                name="website"
                                type="text"
                                className="w-full border-2 border-black rounded px-3 py-2 outline-none focus:ring-1 focus:ring-black"
                                placeholder="Website"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                value={inputForm.location}
                                onChange={handleOnChange}
                                name="location"
                                type="text"
                                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-black"
                                placeholder="Location"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-base font-medium mb-2">Logo</label>
                            <input
                                onChange={handleOnChange}
                                name="imageFile"
                                type="file"
                                className="w-full border rounded px-4 py-3 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-gray-100 file:text-base"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <div className="pt-4">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded hover:bg-opacity-90 transition"
                        >
                            {isLoading || Upload ? <ButtonLoader/> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCompany;