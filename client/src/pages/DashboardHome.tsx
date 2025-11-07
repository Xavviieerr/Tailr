import React from "react";
import JobInfoForm from "../components/JobInfoForm";
import CVtemplate from "../assets/template/CVtemplate";
import { useAuth } from "@clerk/clerk-react";

const sampleData = {
  name: "Chidera Ogbu",
  title: "Frontend Developer",
  summary:
    "Creative and detail-oriented developer skilled in building scalable web applications using React, TypeScript, and Tailwind CSS.",
  contact: {
    email: "chidera@example.com",
    phone: "+234 812 345 6789",
    location: "Lagos, Nigeria",
  },
  skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
  experience: [
    {
      role: "Frontend Engineer",
      company: "Techify Ltd.",
      duration: "2022 - Present",
      details: [
        "Built and optimized responsive dashboards using React and Tailwind.",
        "Collaborated with designers to improve UI/UX across 5 products.",
      ],
    },
  ],
  education: [
    {
      school: "University of Lagos",
      degree: "B.Sc. Computer Science",
      year: "2021",
    },
  ],
};

const DashboardHome = () => {
  const { getToken, isSignedIn } = useAuth();

  const token = getToken();
  console.log(token);
  const handlePrint = () => {
    window.print();
  };

  const handleRedo = () => {
    alert("redo");
  };

  const handleSave = () => {
    alert("Save");
  };
  return (
    <div className="m-3 gap-3  h-full rounded-md flex">
      <div className="rounded-md shadow-[0px_0px_4px_0px_rgba(0,0,0,0.3)] w-1/2 p-2">
        <h1 className="font-bold text-lg text-gray-600">Job Description</h1>
        <div className=" h-full overflow-y-scroll">
          <JobInfoForm />
        </div>
      </div>
      <div className="rounded-md shadow-[0px_0px_4px_0px_rgba(0,0,0,0.3)] w-1/2 p-2 h-auto overflow-y-scroll">
        <div className="flex gap-3 justify-evenly border-b  border-blue-900">
          <button
            onClick={handlePrint}
            className="mb-4 bg-blue-600 hover:animate-pulse text-white px-4 py-2 static rounded-lg hover:bg-blue-700"
          >
            Download CV
          </button>
          <button
            onClick={handleRedo}
            className=" mb-4 bg-blue-600 hover:animate-pulse text-white px-4 py-2 static rounded-lg hover:bg-blue-700"
          >
            Redo
          </button>
          <button
            onClick={handleSave}
            className=" mb-4 bg-blue-600 hover:animate-pulse text-white px-4 py-2 static rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
        <CVtemplate data={sampleData} />
      </div>
    </div>
  );
};

export default DashboardHome;
