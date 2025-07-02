import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {setToken} from "@/utilitis/sessionHelper.js";
import toast from "react-hot-toast";


const authAPI=createApi({
    reducerPath:"authAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/user`,
        credentials:"include",
    }),
    tagTypes:["User"],
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(newUser)=>({
                url:'/register',
                method:"POST",
                body:newUser,
            })
        }),
        loginUser:builder.mutation({
            query:(userData)=>({
                url:'/login',
                method:"POST",
                body:userData,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    setToken(data.token);
                    toast.success("Login successful");
                } catch (err) {
                    toast.error("Login failed");
                }
            }
        }),
        userLogout:builder.mutation({
           query:()=>({
               url:'/logout',
               method:"POST",
           })
        }),
        userUpdate:builder.mutation({
            query:({id,newData})=>({
                url:`/update-user/${id}`,
                method:"POST",
                body:newData,
            })
        }),
        getUser:builder.query({
            query:(id)=>({
                url:`/get-user/${id}`,
                method:"GET",
            })
        })
    })
})


export const {useRegisterUserMutation,useLoginUserMutation,useUserUpdateMutation,useGetUserQuery,useUserLogoutMutation}=authAPI;
export default authAPI;