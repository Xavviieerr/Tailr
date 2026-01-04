import { FileText } from "lucide-react";
import React, { useEffect, useState, type ChangeEvent } from "react";
import Loader from "../components/Loader";

interface ProfileInfo {
  firstname: string;
  lastname: string;
  email: string;
  status: "user" | "admin";
}
const initialProfileState: ProfileInfo = {
  firstname: "maria",
  lastname: "fernanda",
  email: "mariafernanda@gmail.com",
  status: "user",
};
const DashboardProfile = () => {
  const [readOnly, setReadOnly] = useState(true);
  const [profileInfo, setProfileInfo] =
    useState<ProfileInfo>(initialProfileState);

  const [loading, setLoading] = useState(true);

  const handleEdit = () => {
    setReadOnly(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;

    setProfileInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setReadOnly(true);
  };
  return (
    <div className=" flex flex-col px-20 ">
      {/* <Loader /> */}
      <div className="flex flex-col border-b-2  border-gray-400 mx-3 my-5 py-2">
        <span className="text-2xl font-bold text-gray-700">Profile</span>
        <span>View all your profile details here.</span>
      </div>
      <div className="h-auto w-full p-3 flex gap-5 rounded-lg my-4 border-b-2 rounded-b-lg border-gray-500">
        <div className="h-auto shadow-md p-3 w-2/6 rounded-md items-center flex flex-col gap-1 ">
          <span className="font-bold text-xl">
            {profileInfo.firstname} {profileInfo.lastname}
          </span>
          <span className="text-sm">Admin</span>
          <div className="rounded-full p-3 w-[80%] bg-gray-400">
            <img
              src="/public/tailr.svg"
              alt=""
              className="w-auto rounded-full bg-white"
            />
          </div>
        </div>
        <div className="h-full p-2 py-9 w-4/6 flex shadow-lg gap-2 ">
          <div className="w-1/2 p-2">
            <span className="font-bold text-sm">Bio</span>
            <div className="">
              <div className="flex flex-col border-b-1 border-dashed p-2">
                <span className="text-sm text-gray-500">Firstname</span>
                <span className="text-gray-800 font-bold">
                  <input
                    name="firstname"
                    value={profileInfo.firstname}
                    type="text"
                    onChange={handleChange}
                    readOnly={readOnly}
                    className={`${
                      readOnly ? "outline-none" : "outline"
                    } w-full`}
                  />
                </span>
              </div>
              <div className="flex flex-col p-2 border-b-1 border-dashed">
                <span className="text-sm text-gray-500">Lastname</span>
                <span className="text-gray-800 font-bold">
                  <input
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    readOnly={readOnly}
                    value={profileInfo.lastname}
                    className={`${
                      readOnly ? "outline-none" : "outline"
                    } w-full`}
                  />
                </span>
              </div>
              <div className="flex flex-col p-2 border-b-1 border-dashed">
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-gray-800 font-bold">
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    readOnly={readOnly}
                    value={profileInfo.email}
                    className={`${
                      readOnly ? "outline-none" : "outline"
                    } w-full`}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/2 p-2">
            <span className="font-bold text-sm">Other account details</span>
            <div className="flex flex-col gap-2 items-center mt-[20%]">
              <FileText
                size={90}
                strokeWidth={2}
                className="text-3xl text-blue-900 "
              />
              <span className="font-bold">Total applications created</span>
              <span className="font-bold text-3xl">1000</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-5  w-auto">
        <button
          onClick={handleEdit}
          className={`
        animate-bounce
        text-[#090909]
        py-2 px-4
        text-lg
        rounded-lg
        bg-[#e8e8e8]
        cursor-pointer\
        border-b-2
        border-blue-900
         border-[#e8e8e8]
        transition-all duration-300
        shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]
        hover:border-white
        active:shadow-[4px_4px_12px_#c5c5c5,-4px_-4px_12px_#ffffff]
      `}
        >
          Edit
        </button>
        <button
          onClick={handleSave}
          className={`
            animate-bounce
            border-b-2
            border-blue-900
        text-[#090909]
        py-2 px-4
        text-lg
        rounded-lg
        bg-[#e8e8e8]
        cursor-pointer
         border-[#e8e8e8]
        transition-all duration-300
        shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]
        hover:border-white
        active:shadow-[4px_4px_12px_#c5c5c5,-4px_-4px_12px_#ffffff]
      `}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DashboardProfile;
