import React from "react";
import Custom from "./custom";

const CardEditor = () => {
  return (
    <div
      style={{
        float: "left",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Custom />
    </div>
  );
};

export default CardEditor;
