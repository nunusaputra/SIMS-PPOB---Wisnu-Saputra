import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div>
      <HashLoader color="#fff" size={25} className="mx-auto" />
    </div>
  );
};

export default Loading;
