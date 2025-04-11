import ProjectViewer from "@/components/ProjectViewer";

const Page = ({ params }: { params: { projectId: string } }) => {
  return (
    <section>
      <div className="mainContainer py-8">
        <h2 className="text-xl font-bold mb-4">Project: {params?.projectId}</h2>
        <ProjectViewer id={params?.projectId} />
      </div>
    </section>
  );
};

export default Page;
