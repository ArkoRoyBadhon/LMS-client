import ModuleManage from "@/components/dashboard/module/ModuleManage";

const page = ({ params }: { params: { moduleId: string } }) => {
  return (
    <section>
      <div className="mainContainer py-[40px]">
        <ModuleManage id={params?.moduleId} />
      </div>
    </section>
  );
};

export default page;
