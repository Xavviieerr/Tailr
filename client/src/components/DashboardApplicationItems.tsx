import React from "react";
import { type DashboardApplicationType } from "../types/dashboardTypes";
import { Edit, Eye, Trash2 } from "lucide-react";

interface DashboradApplicationProps {
  cvs: DashboardApplicationType[];
}

const DashboardApplicationItems: React.FC<DashboradApplicationProps> = ({
  cvs,
}) => {
  return (
    <>
      {cvs.length === 0 ? (
        <p className="text-gray-500">You haven’t created any CVs yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                  Job Title
                </th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                  Company
                </th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                  Created
                </th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                  Status
                </th>
                <th className="text-center px-4 py-3 text-gray-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cvs.map((cv) => (
                <tr
                  key={cv.id}
                  className="border-t border-gray-400 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {cv.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{cv.jobTitle}</td>
                  <td className="px-4 py-3 text-gray-500">{cv.company}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(cv.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        cv.status === "Tailored"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {cv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button
                      className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                      title="View CV"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-purple-50 text-purple-600 transition"
                      title="Edit CV"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                      title="Delete CV"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DashboardApplicationItems;
