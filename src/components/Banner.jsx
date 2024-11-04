import React from "react";

const Banner = ({ item }) => {
  return (
    <div className="w-96 h-40 bg-red-500 rounded-lg">
      <img
        src={item.banner_image}
        alt={item.banner_name}
        className="w-full h-full rounded-lg"
      />
    </div>
  );
};

export default Banner;
