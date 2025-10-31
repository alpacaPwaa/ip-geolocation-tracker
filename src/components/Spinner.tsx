import React from "react";

const Spinner: React.FC = () => {
  return (
    <div
      className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-sky-400"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
