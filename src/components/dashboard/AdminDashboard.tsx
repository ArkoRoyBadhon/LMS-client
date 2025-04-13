import Link from "next/link";
import AllCourses from "./AllCourses";
import { FaPlus } from "react-icons/fa";
import { useAppSelector } from "@/lib/redux.hooks";

const AdminDashboard = () => {
  // const user = {
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   role: "Admin",
  //   status: "Active",
  //   joined: "2023-01-15",
  // };

  const user = useAppSelector((state) => state.auth.user);

  const recentActivities = [
    {
      id: 1,
      description: 'New course added: "React Basics"',
      time: "2 days ago",
    },
    {
      id: 2,
      description: 'Module updated: "Advanced JavaScript"',
      time: "5 days ago",
    },
    {
      id: 3,
      description: 'Lecture uploaded: "TypeScript Essentials"',
      time: "1 week ago",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gray-100 p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-bold mb-4">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Name:</p>
            <p>
              {user?.first_name} {user?.last_name}
            </p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p className="font-semibold">Role:</p>
            <p>{user?.role}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <p className="text-green-600">Active</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="px-12 py-4 bg-primary rounded-md text-center font-semibold text-white">
          <p>Course</p>
          <p className="mt-2 text-2xl">12</p>
        </div>
        <div className="px-12 py-4 bg-success rounded-md text-center font-semibold text-white">
          <p>Module</p>
          <p className="mt-2 text-2xl">45</p>
        </div>
        <div className="px-12 py-4 bg-warning rounded-md text-center font-semibold text-white">
          <p>Lecture</p>
          <p className="mt-2 text-2xl">120</p>
        </div>
      </div>

      <div className="">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Course Management</h2>
          <Link
            href={`/dashboard/course/create`}
            className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md flex items-center gap-2"
          >
            <FaPlus /> Create Course
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AllCourses />
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-md shadow-sm pt-4">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          {recentActivities.map((activity) => (
            <li key={activity.id}>
              <p className="font-semibold">{activity.description}</p>
              <p className="text-sm text-gray-600">{activity.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
