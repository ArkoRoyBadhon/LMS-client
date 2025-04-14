import CourseUpdate from "@/components/dashboard/course/CourseUpdate";

const page = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const { courseId } = await params;
  return (
    <section>
      <div className="mainContainer py-[20px] min-h-[calc(100vh-200px)]">
        <CourseUpdate id={courseId} />
      </div>
    </section>
  );
};

export default page;
