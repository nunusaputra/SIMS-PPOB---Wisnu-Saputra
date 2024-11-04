import React from "react";

const Services = ({ item }) => {
  return (
    <div className="w-20 flex flex-col items-center justify-start gap-2">
      <div className="w-14 h-14 rounded-md bg-gray-300 overflow-hidden flex-shrink-0">
        <img
          src={item.service_icon}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-8 flex items-center">
        <h1 className="text-sm text-center leading-tight">
          {item.service_name}
        </h1>
      </div>
    </div>
  );
};

export default Services;
