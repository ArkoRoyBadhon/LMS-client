import ManageModuleLecture from "@/components/dashboard/ManageModuleLecture";
import React from "react";

const page = ({ params }: { params: { manageId: string } }) => {
  return (
    <section>
      <div className="mainContainer py-[20px]">
        <ManageModuleLecture id={params?.manageId} />
      </div>
    </section>
  );
};

export default page;
