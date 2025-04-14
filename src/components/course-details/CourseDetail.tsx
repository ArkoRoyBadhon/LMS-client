"use client";

import GotComponent from "./GotComponent";
import Instructor from "./Instructor";
import Feedback from "./Feedback";
import CommonQuestions from "./CommonQuestions";
import CourseIntro from "./CourseIntro";
import { useGetSingleCourseQuery } from "@/lib/features/course/courseApi";
import Loader from "../Loader";

const CourseDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleCourseQuery(id);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="py-[20px]">
      <CourseIntro data={data.data} />
      <div className="">
        <GotComponent />
        <Instructor />
        <Feedback />
        <CommonQuestions />
      </div>
    </div>
  );
};

export default CourseDetail;
