import { Info } from "lucide-react";
import React, { useState, type ChangeEvent } from "react";

interface JobInfo {
  title: string;
  description: string;
  company: string;
  notes?: string;
  file?: File | null;
}

const JobInfoForm: React.FC = () => {
  const [jobInfo, setJobInfo] = useState<JobInfo>({
    title: "",
    description: "",
    company: "",
    notes: "",
    file: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setJobInfo((prev) => ({ ...prev, file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(jobInfo);
    // Later: send this to backend or move to next step
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Tailr your CV to a specific job
      </h2>
      <p className="text-gray-500 text-sm">
        Fill out the details below — our AI will use this information to
        generate a personalized CV.
      </p>

      {/* JOB TITLE */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          Job Title
          <span className="relative group cursor-pointer text-blue-500">
            <i className="fa-solid fa-circle-info">{<Info />}</i>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-48">
              This helps us personalize your CV headline and tone.
            </span>
          </span>
        </label>
        <input
          name="title"
          value={jobInfo.title}
          onChange={handleChange}
          placeholder="e.g. Frontend Developer"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* JOB DESCRIPTION */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          Job Description
          <span className="relative group cursor-pointer text-blue-500">
            <i className="fa-solid fa-circle-info">{<Info />}</i>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-52">
              Paste the full job description. AI extracts key skills and
              requirements from it.
            </span>
          </span>
        </label>
        <textarea
          name="description"
          value={jobInfo.description}
          onChange={handleChange}
          placeholder="Paste the full job post or description here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          rows={4}
        />
      </div>

      {/* COMPANY INFO */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          Company Information
          <span className="relative group cursor-pointer text-blue-500">
            <i className="fa-solid fa-circle-info">{<Info />}</i>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-48">
              Mention company mission, values, or culture for better tone
              matching.
            </span>
          </span>
        </label>
        <textarea
          name="company"
          value={jobInfo.company}
          onChange={handleChange}
          placeholder="What do you know about the company?"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          rows={3}
        />
      </div>

      {/* NOTES */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          Extra Notes
          <span className="relative group cursor-pointer text-blue-500">
            <i className="fa-solid fa-circle-info">{<Info />}</i>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-48">
              This is your playground. Let us know what you want the AI to
              emphasize or modify.
            </span>
          </span>
        </label>
        <textarea
          name="notes"
          value={jobInfo.notes}
          onChange={handleChange}
          placeholder="Include extra experiences, achievements etc (generally new details that should be added to your CV)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          rows={3}
        />
      </div>

      {/* FILE UPLOAD */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          Upload Existing CV
          <span className="relative group cursor-pointer text-blue-500">
            <i className="fa-solid fa-circle-info">{<Info />}</i>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-48">
              Upload your CV (PDF/DOCX) — we’ll use it to refine your tailored
              version.
            </span>
          </span>
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition w-full"
      >
        Generate
      </button>
    </form>
  );
};

export default JobInfoForm;
