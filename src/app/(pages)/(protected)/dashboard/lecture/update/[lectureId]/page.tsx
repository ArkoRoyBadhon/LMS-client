import LectureUpdate from "@/components/dashboard/lecture/lectureUpdate";
import React from "react";

const page = ({ params }: { params: { lectureId: string } }) => {
  return (
    <div>
      <section>
        <div className="mainContainer py-[40px]">
          <LectureUpdate id={params?.lectureId} />
        </div>
      </section>
    </div>
  );
};

export default page;
