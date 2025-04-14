"use client";
import AllCoursesByUser from "@/components/AllCouresesByUser";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { useAppSelector } from "@/lib/redux.hooks";

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <section>
      <div className="mainContainer min-h-[calc(100vh-200px)]">
        {user?.role === "ADMIN" ? (
          <>
            <h2 className="text-darkest font-semibold text-[24px] py-8">
              Admin Dashboard
            </h2>
            <AdminDashboard />
          </>
        ) : (
          <>
            <h2 className="text-darkest font-semibold text-[24px] py-8">
              Dashboard ( My Courses )
            </h2>
            <AllCoursesByUser />
          </>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
