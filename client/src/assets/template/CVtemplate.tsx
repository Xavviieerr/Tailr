// CVTemplate.tsx
import React from "react";

interface CVDta {
  name: string;
  title: string; // The main professional title (e.g., Senior Node.js Developer)
  summary: string; // The introductory paragraph, tailored to the job description

  // --- Core Header Information ---
  contact: {
    email: string;
    phone?: string; // Made optional, as it's not always required
    location: string;
    linkedinUrl?: string; // Added: Essential for professional networking
    githubUrl?: string; // Added: Crucial for showcasing technical work
  };

  // --- Work Experience Section ---
  experience: {
    role: string;
    company: string;
    duration: string; // e.g., "Jan 2021 - Present"
    achievements: string[]; // Corrected: Renamed from 'details' for better semantics
  }[]; // This array structure ensures scalability for multiple jobs

  // --- Education Section ---
  education: {
    school: string;
    degree: string;
    durationOrYear: string; // Corrected: Renamed from 'year' for flexibility
  }[]; // This array structure ensures scalability for multiple degrees/certs

  // --- Skills and Additional Sections ---
  skills: string[]; // Simple array of keywords/tools (e.g., ["TypeScript", "Kafka", "AWS"])
  awardsAndCertifications?: string[]; // Added: An optional section for quick reference
}
interface CVData {
  name: string;
  title: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  skills: string[];
  experience: {
    role: string;
    company: string;
    duration: string;
    details: string[];
  }[];
  education: {
    school: string;
    degree: string;
    year: string;
  }[];
}

interface CVTemplateProps {
  data: CVData;
}

const CVTemplate: React.FC<CVTemplateProps> = ({ data }) => {
  return (
    <div id="cv-template" className="max-w-3xl mx-auto bg-white rounded-lg p-8">
      {/* Header */}
      <header className="border-b border-gray-300 pb-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
        <h2 className="text-lg text-blue-600 font-medium">{data.title}</h2>
        <p className="text-sm text-gray-500 mt-2">
          {data.contact.email} | {data.contact.phone} | {data.contact.location}
        </p>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Profile Summary
        </h3>
        <p className="text-gray-600 leading-relaxed">{data.summary}</p>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Skills</h3>
        <ul className="flex flex-wrap gap-2">
          {data.skills.map((skill, idx) => (
            <li
              key={idx}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Experience</h3>
        {data.experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <h4 className="text-lg font-semibold text-gray-800">{exp.role}</h4>
            <p className="text-sm text-gray-500">
              {exp.company} • {exp.duration}
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {exp.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Education</h3>
        {data.education.map((edu, idx) => (
          <div key={idx} className="mb-2">
            <p className="font-medium text-gray-800">{edu.school}</p>
            <p className="text-sm text-gray-500">
              {edu.degree} • {edu.year}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CVTemplate;
