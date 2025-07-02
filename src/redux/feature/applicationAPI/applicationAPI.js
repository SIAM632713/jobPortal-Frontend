import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const applicationAPI = createApi({
    reducerPath:"applicationAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/application`,
        credentials:"include"
    }),
    tagTypes:["application"],
    endpoints:(builder)=>({
        applyJobs:builder.mutation({
            query:(id)=>({
                url: `apply-job/${id}`,
                method:"POST",
            })
        }),
        getApplicantAdminUser:builder.query({
            query:(id)=>({
                url: `Appliedjob-user/${id}`,
                method:"GET",
            })
        }),
        updateStatus:builder.mutation({
            query:({id,status})=>({
                url: `update-status/${id}`,
                method:"POST",
                body: {status}
            })
        }),
        getApplicantUser:builder.query({
            query:(id)=>({
                url: `applicant-user/${id}`,
                method:"GET",
            })
        })
    })
})


export const {useApplyJobsMutation,useGetApplicantAdminUserQuery,useUpdateStatusMutation,useGetApplicantUserQuery}=applicationAPI;
export default applicationAPI;