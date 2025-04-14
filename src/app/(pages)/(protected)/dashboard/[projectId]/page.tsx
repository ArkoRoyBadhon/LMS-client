import ProjectViewer from "@/components/dashboard/ProjectViewer";

const Page = ({ params }: { params: { projectId: string } }) => {
  return (
    <section>
      <div className="mainContainer py-8 min-h-[calc(100vh-200px)]">
        <ProjectViewer id={params?.projectId} />
      </div>
    </section>
  );
};

export default Page;
