import React, {useState} from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel.jsx";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Latestjob from "@/components/Home/latestjob.jsx";
import {useGetjobByFilterQuery} from "@/redux/feature/jobAPI/jobAPI.js";

const roles = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "UI/UX Designer", "DevOps Engineer", "Mobile App Developer",
    "QA Engineer", "Data Scientist", "Data Analyst", "AI Engineer"
];

const Category = () => {

    const [filterState,setfilterState]=useState({
        title: "all",
    });
    const {title}=filterState
    const {data,error,isLoading}=useGetjobByFilterQuery({
        title:title !== "all" ? title : "",
    })

    const jobList=data?.data || []

    const handleFilterChange = (role) => {
        setfilterState({ title: role });
    };

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex justify-center items-center mt-10 sm:mt-15">
                <Carousel className="w-full max-w-6xl relative">
                    <CarouselContent className="flex items-center">
                        {roles.map((role, index) => (
                            <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 lg:basis-1/4 flex justify-center">
                                <button
                                    onClick={() => handleFilterChange(role)}
                                    className={`px-4 sm:px-6 py-1 sm:py-2 border rounded-full shadow-sm transition font-medium text-sm sm:text-base ${
                                        title === role
                                            ? "bg-purple-600 text-white border-purple-600"
                                            : "bg-white text-gray-800 border-gray-300 hover:shadow-md"
                                    }`}
                                >
                                    {role}
                                </button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious
                        className="absolute left-0 -translate-y-1/2 top-1/2 bg-white border border-gray-300 shadow-sm p-1 sm:p-2 rounded-full hover:shadow-md z-10">
                        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4"/>
                    </CarouselPrevious>

                    <CarouselNext
                        className="absolute right-0 -translate-y-1/2 top-1/2 bg-white border border-gray-300 shadow-sm p-1 sm:p-2 rounded-full hover:shadow-md z-10">
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4"/>
                    </CarouselNext>
                </Carousel>
            </div>
            <div className="mt-6 sm:mt-8">
                <Latestjob jobList={jobList} error={error} isLoading={isLoading}/>
            </div>
        </div>
    );
};

export default Category;