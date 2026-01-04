import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray bg-opacity-20 z-50 flex items-center justify-center">
      <div className="honeycomb h-6 w-6 relative">
        <div
          className="honeycomb-cell absolute h-3 w-6 mt-1.5 bg-[#212774]"
          style={{ left: "-28px", top: "0", animationDelay: "0s" }}
        />
        <div
          className="honeycomb-cell absolute h-3 w-6 mt-1.5 bg-[#212774]"
          style={{ left: "-14px", top: "22px", animationDelay: "0.1s" }}
        />
        <div
          className="honeycomb-cell absolute h-3 w-6 mt-1.5 bg-[#212774]"
          style={{ left: "14px", top: "22px", animationDelay: "0.2s" }}
        />
        <div
          className="honeycomb-cell absolute h-3 w-6 mt-1.5 bg-[#212774]"
          style={{ left: "28px", top: "0", animationDelay: "0.3s" }}
        />
        <div
          className="honeycomb-cell absolute h-3 w-6 mt-1.5 bg-[#212774]"
          style={{ left: "14px", top: "-22px", animationDelay: "0.4s" }}
        />
        <div
          className="honeycomb-cell absolute h-3 w-6 mt-1.5 bg-[#212774]"
          style={{ left: "-14px", top: "-22px", animationDelay: "0.5s" }}
        />
        <div
          className="honeycomb-cell absolute h-3 w-6 mt-1.5 bg-[#212774]"
          style={{ left: "0", top: "0", animationDelay: "0.6s" }}
        />
      </div>
    </div>
  );
};

export default Loader;
