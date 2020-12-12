import React from "react";

export const Tag = (props: any) => {
  return (
    <div className="px-6 py-4">
      <span className="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold mr-2 text-white">
        {props.name}
      </span>
    </div>
  );
};
