import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="">
      <div className="mainContainer py-8">
        <h2 className="text-darkest font-semibold text-[24px]">All Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] py-[20px]">
          <div className="border rounded-2xl overflow-hidden cursor-pointer">
            <Image
              src="/tiger.jpg"
              className="w-full h-[200px]"
              height={400}
              width={240}
              alt=""
            />
            <div className="py-6 px-4">
              <h4 className="">Title</h4>
              <p className="">
                <strong>Price: </strong> <span className="">500$</span>
              </p>
              <p className="">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint,
                asperiores.
              </p>
            </div>
          </div>
          <div className="border rounded-2xl overflow-hidden cursor-pointer">
            <Image
              src="/tiger.jpg"
              className="w-full h-[200px]"
              height={400}
              width={240}
              alt=""
            />
            <div className="py-6 px-4">
              <h4 className="">Title</h4>
              <p className="">
                <strong>Price: </strong> <span className="">500$</span>
              </p>
              <p className="">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint,
                asperiores.
              </p>
            </div>
          </div>
          <div className="border rounded-2xl overflow-hidden cursor-pointer">
            <Image
              src="/tiger.jpg"
              className="w-full h-[200px]"
              height={400}
              width={240}
              alt=""
            />
            <div className="py-6 px-4">
              <h4 className="">Title</h4>
              <p className="">
                <strong>Price: </strong> <span className="">500$</span>
              </p>
              <p className="">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint,
                asperiores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
