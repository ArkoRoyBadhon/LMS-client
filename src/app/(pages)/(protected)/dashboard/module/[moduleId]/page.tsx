import ModuleManage from "@/components/dashboard/module/ModuleManage";

const page = ({ params }: { params: { moduleId: string } }) => {
  return (
    <section>
      <div className="mainContainer py-[20px]">
        <h2 className="text-darkest font-semibold text-[24px] py-8">
          Module Details : {params?.moduleId}
        </h2>
        <ModuleManage id={params?.moduleId} />
      </div>
    </section>
  );
};

export default page;
