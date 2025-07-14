import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const jobAPI=createApi({
    reducerPath: "jobAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/jobs`,
        credentials:"include"
    }),
    tagTypes:["Jobs"],
    endpoints:(builder)=>({
        getJobPost:builder.query({
            query:()=>({
                url:"/get-alljob",
                method:"GET"
            })
        }),
        getJobPostbyID:builder.query({
            query:(id)=>({
                url:`/get-jobs/${id}`,
                method:"GET"
            })
        }),
        getJobbyCategory:builder.query({
            query:(title)=>({
                url:`/get-jobcategory/${title}`,
                method:"GET"
            })
        }),
        getjobByFilter:builder.query({
            query:({keyword,title,location,minSalary,maxSalary})=>{
                const queryParams=new URLSearchParams({
                    keyword:keyword || "",
                    title:title || "",
                    location:location || "",
                    minSalary:minSalary || 0,
                    maxSalary:maxSalary || 999999
                })
                return `/get-jobquery?${queryParams}`
            }
        }),
        deleteJobById:builder.mutation({
            query:(id)=>({
                url:`/delete-job/${id}`,
                method:"DELETE"
            })
        }),
        editJobById:builder.mutation({
            query:({id, updatedata})=>({
                url:`/update-job/${id}`,
                method:"POST",
                body:updatedata
            })
        }),
        ListByKeywordService:builder.query({
            query:(keyword)=>({
                url:`/get-jobsearch?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        }),
        jobPosts:builder.mutation({
            query:(newJob)=>({
                url:"/job-post",
                method:"POST",
                body:newJob
            })
        })
    })
})

export const {useGetJobPostQuery,useGetJobPostbyIDQuery,useGetJobbyCategoryQuery,useGetjobByFilterQuery,useDeleteJobByIdMutation,useEditJobByIdMutation,useListByKeywordServiceQuery,useJobPostsMutation}=jobAPI;
export default jobAPI;