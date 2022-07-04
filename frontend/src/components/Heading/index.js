import React from "react";
import "./styles.css";

const Heading = ({ heading }) => {
  return (
    <div className="homeHeading">
      <h2 className="homeHeadingText">{heading}</h2>
    </div>
  );
};

export default Heading;
