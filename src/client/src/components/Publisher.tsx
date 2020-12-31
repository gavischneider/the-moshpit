import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { feeds } from "../constants/feeds";
import { InitialState } from "../store/reducers/rootReducer";

// Change feeds to the feeds loaded into state
export const Publisher = (props: any) => {
  const [image, setImage] = useState("");
  const publisherState = useSelector((state: InitialState) => {
    return state.publishers;
  });

  const { publishers } = publisherState;
  useEffect(() => {
    publishers?.map((publisher) => {
      if (publisher.name.localeCompare(props.publisher) === 0) {
        console.log(`We found a match: ${publisher.name} = ${props.publisher}`);
        console.log(`Publisher Image: ${publisher.image}`);
        setImage(publisher.image);
      }
    });
  }, [image, publishers]);

  //user.user.sources

  console.log(`ImagePath: ${image}`);
  return (
    <div className="flex items-center">
      <img
        src={image}
        alt="publisher"
        className="w-6 h-6 rounded-full border border-black"
      />
    </div>
  );
};
