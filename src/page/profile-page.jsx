import React from 'react';
import UserProfile from "@/components/profile/userProfile.jsx";
import Table from "@/components/profile/table.jsx";

const ProfilePage = () => {
    return (
        <>
          <UserProfile/>
            <Table/>
        </>
    );
};

export default ProfilePage;