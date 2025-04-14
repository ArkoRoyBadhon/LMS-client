import LectureUpdate from "@/components/dashboard/lecture/lectureUpdate";
import React from "react";

const page = async ({ params }: { params: Promise<{ lectureId: string }> }) => {
  const { lectureId } = await params;
  return (
    <div>
      <section>
        <div className="mainContainer py-[40px] min-h-[calc(100vh-200px)]">
          <LectureUpdate id={lectureId} />
        </div>
      </section>
    </div>
  );
};

export default page;
