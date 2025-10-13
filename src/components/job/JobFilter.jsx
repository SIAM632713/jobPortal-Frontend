import React from 'react';

const Filter = {
    title: [
        "Frontend Developer", "Backend Developer", "Full Stack Developer",
        "UI/UX Designer", "DevOps Engineer", "Mobile App Developer",
        "QA Engineer", "Data Scientist", "Data Analyst", "AI Engineer"
    ],
    location: ["Remote", "Dhaka", "Sylhet", "Khulna", "Chittagong", "Cumilla", "Tangail","Barisal"],
    salaryRange: [
        { label: "20000-40000", min: 20000, max: 40000 },
        { label: "45000-70000", min: 45000, max: 70000 },
        { label: "75000-130000", min: 75000, max: 130000 }
    ]
};

const JobFilter = ({ filterState, setfilterState }) => {
    return (
        <div className="w-64 bg-white shadow rounded-lg p-4 h-fit">
            <h2 className="font-semibold mb-4">Filter Jobs</h2>

            {/* Location Filter */}
            <div className="mb-4">
                <h3 className="font-medium">Location</h3>
                {Filter.location.map(item => (
                    <div key={item} className="flex items-center mt-1">
                        <input
                            type="radio"
                            name="location"
                            value={item}
                            checked={filterState.location === item}
                            onChange={(e) =>
                                setfilterState({ ...filterState, location: e.target.value })
                            }
                        />
                        <label className="ml-2">{item}</label>
                    </div>
                ))}
            </div>

            {/* Industry Filter (Title) */}
            <div className="mb-4">
                <h3 className="font-medium">Industry</h3>
                {Filter.title.map(item => (
                    <div key={item} className="flex items-center mt-1">
                        <input
                            type="radio"
                            name="title"
                            value={item}
                            checked={filterState.title === item}
                            onChange={(e) =>
                                setfilterState({ ...filterState, title: e.target.value })
                            }
                        />
                        <label className="ml-2">{item}</label>
                    </div>
                ))}
            </div>

            {/* Salary Range Filter */}
            <div>
                <h3 className="font-medium">Salary</h3>
                {Filter.salaryRange.map((item, index) => (
                    <div key={index} className="flex items-center mt-1">
                        <input
                            type="radio"
                            name="salary"
                            value={`${item.min}-${item.max}`}
                            checked={filterState.salaryRange === `${item.min}-${item.max}`}
                            onChange={(e) =>
                                setfilterState({ ...filterState, salaryRange: e.target.value })
                            }
                        />
                        <label className="ml-2">{item.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobFilter;
