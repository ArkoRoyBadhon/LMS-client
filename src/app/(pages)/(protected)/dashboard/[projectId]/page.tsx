import ProjectViewer from "@/components/dashboard/ProjectViewer";

const Page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  return (
    <section>
      <div className="mainContainer py-8 min-h-[calc(100vh-200px)]">
        <ProjectViewer id={projectId} />
      </div>
    </section>
  );
};

export default Page;
