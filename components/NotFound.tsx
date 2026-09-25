import React from "react";

const NotFound = () => {
  return (
    <main className="flex  items-center justify-center px-4">
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-5 text-center">
        <h1 className="text-xl font-semibold text-red-700">
          Pokemon not found
        </h1>
      </div>
    </main>
  );
};

export default NotFound;
