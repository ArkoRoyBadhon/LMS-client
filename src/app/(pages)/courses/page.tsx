import CoursesComponent from "@/components/courses";
import React from "react";

const page = () => {
  return (
    <section className="">
      <div className="mainContainer py-8">
        <h2 className="text-darkest font-semibold text-[24px]">All Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] py-[20px]">
          <CoursesComponent />
        </div>
      </div>
    </section>
  );
};

export default page;
