import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="/Spinner@1x-1.0s-200px-200px.svg"
        alt="Loading..."
        width={200}
        height={200}
        className="w-[100px] h-[100px]"
      />
    </div>
  );
};

export default Loader;
