import LectureCreate from "@/components/dashboard/lecture/lectureCreate";

const page = ({ params }: { params: { moduleId: string } }) => {
  return (
    <section>
      <div className="mainContainer py-[40px]">
        <LectureCreate id={params?.moduleId} />
      </div>
    </section>
  );
};

export default page;
