import CourseUpdate from "@/components/dashboard/course/CourseUpdate";

const page = ({ params }: { params: { courseId: string } }) => {
  return (
    <section>
      <div className="mainContainer py-[20px]">
        <CourseUpdate id={params?.courseId} />
      </div>
    </section>
  );
};

export default page;
