import ManageModuleLecture from "@/components/dashboard/ManageModuleLecture";
import React from "react";

const page = async ({ params }: { params: Promise<{ manageId: string }> }) => {
  const { manageId } = await params;

  return (
    <section>
      <div className="mainContainer py-[20px] min-h-[calc(100vh-200px)]">
        <ManageModuleLecture id={manageId} />
      </div>
    </section>
  );
};

export default page;
