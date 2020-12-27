import React, { useEffect } from "react";
import { feeds } from "../constants/feeds";

// Change feeds to the feeds loaded into state
export const Publisher = (props: any) => {
  //console.log(`Publisher Props: ${props.publisher}`);
  let imagePath = "";
  useEffect(() => {
    // Get the publishers photo
    feeds.map((feed) => {
      if (feed.name.localeCompare(props.publisher) === 0) {
        console.log(`We found a match!: ${feed.name} = ${props.publisher}`);
        imagePath = feed.image;
        console.log(`feed.image: ${feed.image}`);
      }
    });
  }, [imagePath]);

  console.log(`ImagePath: ${imagePath}`);
  return (
    <div>
      <img src={imagePath} alt="publisher" />
    </div>
  );
};
