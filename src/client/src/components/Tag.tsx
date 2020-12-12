import React from "react";

export const Tag = (props: any) => {
  return (
    <span className="inline-block bg-gray-500 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 text-white">
      {props.name}
    </span>
  );
};
