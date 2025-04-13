import CourseDetail from "@/components/course-details/CourseDetail";

const page = ({ params }: { params: { projectId: string } }) => {
  return (
    <section>
      <div className="mainContainer py-12">
        <CourseDetail id={params?.projectId} />
      </div>
    </section>
  );
};

export default page;
