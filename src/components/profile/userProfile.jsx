import React from 'react';
import { Mail, Calendar, Pencil } from 'lucide-react';
import Updateprofile from "@/components/profile/Updateprofile.jsx";
import {useGetUserQuery} from "@/redux/feature/authAPI/authAPI.js";
import {useSelector} from "react-redux";
import Loading from "@/components/Screenloading/Loading.jsx";

const UserProfile = () => {
    const {user} = useSelector((state) => state.auth);
    const {data, error, isLoading, refetch} = useGetUserQuery(user?._id)

    const {profilePhoto, fullname, bio, email, phone, skills, resume} = data?.data || []

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const HandleModalopen = () => setIsModalOpen(true);
    const HandleModalclose = () => setIsModalOpen(false);

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-red-600">
                <p className="text-lg font-semibold">Failed to load.</p>
                <p className="text-sm text-gray-600">
                    {error?.error || "Something went wrong. Please try again later."}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Profile Image */}
                <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                    <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    />
                </div>

                <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                        {/* Name and Bio */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {fullname || "Name is not added"}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {bio || "Bio is not added"}
                            </p>
                        </div>

                        {/* Edit Icon */}
                        <button
                            onClick={HandleModalopen}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            aria-label="Edit profile"
                        >
                            <Pencil size={18}/>
                        </button>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 text-sm">
                            <Mail size={16} className="text-gray-500 dark:text-gray-400"/>
                            <span>{email || "Email is not added"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 text-sm">
                            <Calendar size={16} className="text-gray-500 dark:text-gray-400"/>
                            <span>{phone || "Phone number is not added"}</span>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Skills</h4>
                        {skills && (typeof skills === "string" ? skills.split(",") : skills).length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {(typeof skills === "string" ? skills.split(",") : skills).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full"
                                    >
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No skills added</p>
                        )}
                    </div>

                    {/* Resume Link */}
                    <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Resume</h4>
                        {resume ? (
                            <a
                                href={resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                View Resume
                            </a>
                        ) : (
                            <p className="text-sm text-gray-500">No resume uploaded</p>
                        )}
                    </div>
                </div>
            </div>
            <Updateprofile isModalOpen={isModalOpen} HandleModalclose={HandleModalclose} refetch={refetch}/>
        </div>
    );
};

export default UserProfile;