import ModuleManage from "@/components/dashboard/module/ModuleManage";

const page = async ({ params }: { params: Promise<{ moduleId: string }> }) => {
  const { moduleId } = await params;
  return (
    <section>
      <div className="mainContainer py-[40px] min-h-[calc(100vh-200px)]">
        <ModuleManage id={moduleId} />
      </div>
    </section>
  );
};

export default page;
