import {createBrowserRouter} from "react-router-dom";
import App from "@/App.jsx";
import HomePage from "@/page/home-page.jsx";
import JobPage from "@/page/job-page.jsx";
import LoginPage from "@/page/login-page.jsx";
import RegisterPage from "@/page/register-page.jsx";
import ProfilePage from "@/page/profile-page.jsx";
import JobDescriptionPage from "@/page/JobDescription-page.jsx";
import PrivateRoute from "@/routes/privateRoute.jsx";
import CompanyPage from "@/page/company-page.jsx";
import JobPostPage from "@/page/jobPost-page.jsx";
import DashboardLayout from "@/routes/DashboardLayout.jsx";
import CreatCompany from "@/components/adminDashboard/company/creatCompany.jsx";
import EditCompany from "@/components/adminDashboard/company/editCompany.jsx";
import UpdateJobpost from "@/components/adminDashboard/jobPost/updateJobpost.jsx";
import AllApplicant from "@/components/adminDashboard/jobPost/all-applicant.jsx";
import JobPost from "@/components/adminDashboard/jobPost/jobPost.jsx";


const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<HomePage/>,
            },
            {
                path:'/job',
                element:<JobPage/>
            },
            {
                path:'/jobDescription/:id',
                element:<JobDescriptionPage/>,
            },
            {
                path:'/profile',
                element:<ProfilePage/>
            }
        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute role="recruiter"><DashboardLayout/></PrivateRoute>,
        children:[
            {
                path: "company",
                element:<CompanyPage/>
            },
            {
                path: "job-list",
                element:<JobPostPage/>
            },
            {
              path: "job-post",
              element:<JobPost/>
            },
            {
              path: "update-job-post/:id",
              element:<UpdateJobpost/>
            },
            {
                path: "applicant/:id",
                element:<AllApplicant/>
            },
            {
            path:"creat-company",
                element:<CreatCompany/>
            },
            {
                path:"update-company/:id",
                element:<EditCompany/>
            }
        ]
    },
    {
        path:'/login',
        element:<LoginPage/>
    },
    {
        path:'/signup',
        element:<RegisterPage/>
    }
])

export default router