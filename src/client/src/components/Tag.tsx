import React from "react";

export const Tag = (props: any) => {
  return (
    <span className="inline-block bg-gray-500 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2 text-white shadow-md">
      #{props.name}
    </span>
  );
};
