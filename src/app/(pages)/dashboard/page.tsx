import AllCoursesByUser from "@/components/AllCouresesByUser";

const Dashboard = () => {
  //   return <div>dashboard</div>;
  return (
    <section>
      <div className="mainContainer">
        <h2 className="text-darkest font-semibold text-[24px] py-8">
          Dashboard ( My Courses )
        </h2>
        <AllCoursesByUser />
      </div>
    </section>
  );
};

export default Dashboard;
