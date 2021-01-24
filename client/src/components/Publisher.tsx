import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import { feeds } from "../constants/feeds";
import { InitialState } from "../store/reducers/rootReducer";

// Change feeds to the feeds loaded into state
export const Publisher = (props: any) => {
  const [image, setImage] = useState("");
  //const publisherState = useSelector((state: InitialState) => {
  //return state.publishers;
  //});

  const publishers = props.allFeeds;

  useEffect(() => {
    publishers?.map((publisher: any) => {
      if (publisher.name.localeCompare(props.publisher) === 0) {
        setImage(publisher.image);
      }
    });
  }, [image, publishers]);

  return (
    <div className="flex items-center">
      <img
        src={image}
        alt="publisher"
        className="w-6 h-6 rounded-full border border-black shadow-lg"
      />
    </div>
  );
};
