import React from "react";
import DashboardApplicationItems from "../components/DashboardApplicationItems";

export const cvs = [
  {
    id: "cv_1",
    name: "Frontend Developer - Google",
    createdAt: "2025-10-20T10:30:00Z",
    company: "Google",
    jobTitle: "Frontend Developer",
    status: "Tailored",
  },
  {
    id: "cv_2",
    name: "Full Stack Developer - Microsoft",
    createdAt: "2025-09-10T09:00:00Z",
    company: "Microsoft",
    jobTitle: "Full Stack Developer",
    status: "Draft",
  },
  {
    id: "cv_3",
    name: "UI/UX Product Designer - Meta",
    createdAt: "2025-08-01T14:45:00Z",
    company: "Meta",
    jobTitle: "Product Designer",
    status: "Tailored",
  },
  {
    id: "cv_4",
    name: "Frontend Developer - Google",
    createdAt: "2025-10-20T10:30:00Z",
    company: "Google",
    jobTitle: "Frontend Developer",
    status: "Tailored",
  },
  {
    id: "cv_5",
    name: "Full Stack Developer - Microsoft",
    createdAt: "2025-09-10T09:00:00Z",
    company: "Microsoft",
    jobTitle: "Full Stack Developer",
    status: "Draft",
  },
  {
    id: "cv_6",
    name: "UI/UX Product Designer - Meta",
    createdAt: "2025-08-01T14:45:00Z",
    company: "Meta",
    jobTitle: "Product Designer",
    status: "Tailored",
  },
  {
    id: "cv_7",
    name: "Frontend Developer - Google",
    createdAt: "2025-10-20T10:30:00Z",
    company: "Google",
    jobTitle: "Frontend Developer",
    status: "Tailored",
  },
  {
    id: "cv_8",
    name: "Full Stack Developer - Microsoft",
    createdAt: "2025-09-10T09:00:00Z",
    company: "Microsoft",
    jobTitle: "Full Stack Developer",
    status: "Draft",
  },
  {
    id: "cv_9",
    name: "UI/UX Product Designer - Meta",
    createdAt: "2025-08-01T14:45:00Z",
    company: "Meta",
    jobTitle: "Product Designer",
    status: "Tailored",
  },
];

const DashboardApplications = () => {
  return (
    <div className="p-6 h-auto">
      <div className="h-25 mx-10 rounded-md shadow-md  flex  flex-col p-4 jsutify-evenly">
        <span className="font-bold text-2xl text-gray-600">
          My Applications
        </span>
        <span className="text-md text-gray-500">
          Below are all your created applications.
        </span>
      </div>
      <div className="maincontent m-10 h-96 p-2 shadow-md overflow-y-scroll">
        {/* returns the list of user cv created */}
        <DashboardApplicationItems cvs={cvs} />
      </div>
    </div>
  );
};

export default DashboardApplications;
