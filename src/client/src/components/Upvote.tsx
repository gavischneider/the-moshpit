import React from "react";
import { GrSign } from "react-icons/gr";

export const Upvote = (props: any) => {
  const handleClick = (e: React.MouseEvent) => {
    console.log("POST ID");
    console.log(props);
  };

  return (
    <div className="flex items-center">
      <GrSign
        size="2em"
        className="transform transition duration-300 hover:scale-125"
        onClick={handleClick}
      />
      <div className="pl-2 text-lg">0</div>
    </div>
  );
};
