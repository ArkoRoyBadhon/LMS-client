import CourseDetail from "@/components/course-details/CourseDetail";

const page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  return (
    <section>
      <div className="mainContainer py-12">
        <CourseDetail id={projectId} />
      </div>
    </section>
  );
};

export default page;
