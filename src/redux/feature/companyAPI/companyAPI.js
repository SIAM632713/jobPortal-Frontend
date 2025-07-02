import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";

const companyAPI=createApi({
  reducerPath:"companyAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/company`,
        credentials:"include"
    }),
    tagTypes:["Company"],
    endpoints:(builder)=>({
        registerCompany:builder.mutation({
            query:(data)=>({
                url:"/register-company",
                method:"POST",
                body:data
            })
        }),
        getAllcompany:builder.query({
            query:()=>({
                url:"/get-allcompany",
                method:"GET",
            })
        }),
        updateCompany:builder.mutation({
            query:({id,newData})=>({
                url:`/update-company/${id}`,
                method:"POST",
                body: newData
            })
        }),
        deleteCompany:builder.mutation({
            query:(id)=>({
                url:`/delete-company/${id}`,
                method:"POST",
            })
        }),
        getCompanyByKeyword:builder.query({
            query:(keyword)=>({
                url:`/get-companysearch?keyword=${encodeURIComponent(keyword)}`,
                method:"GET",
            })
        })
    })
})

export const {useRegisterCompanyMutation,useGetAllcompanyQuery,useUpdateCompanyMutation,useDeleteCompanyMutation,useGetCompanyByKeywordQuery}=companyAPI;
export default companyAPI