import LectureCreate from "@/components/dashboard/lecture/lectureCreate";

const page = async ({ params }: { params: Promise<{ moduleId: string }> }) => {
  const { moduleId } = await params;
  return (
    <section>
      <div className="mainContainer py-[40px] min-h-[calc(100vh-200px)]">
        <LectureCreate id={moduleId} />
      </div>
    </section>
  );
};

export default page;
