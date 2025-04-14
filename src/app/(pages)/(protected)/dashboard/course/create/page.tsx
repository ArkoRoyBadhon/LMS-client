import CourseCreate from "@/components/dashboard/course/CourseCreate";
import React from "react";

const page = () => {
  return (
    <section className="min-h-[calc(100vh-200px)] mainContainer py-[40px]">
      <CourseCreate />
    </section>
  );
};

export default page;
