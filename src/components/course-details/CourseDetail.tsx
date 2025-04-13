"use client";
import { useGetSingleCourseQuery } from "@/lib/features/course/courseApi";
import Loader from "../Loader";
import Image from "next/image";
import { BsBroadcast } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaListOl, FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";

const CourseDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleCourseQuery(id);
  if (isLoading) {
    return <Loader />;
  }

  const info = [
    {
      id: 1,
      icon: <BsBroadcast />,
      title: "50+ Live Classes",
    },
    {
      id: 2,
      icon: <FaListOl />,
      title: "12+ Projects",
    },
    {
      id: 3,
      icon: <FaRegCalendarAlt />,
      title: "29 Days Left",
    },
    {
      id: 4,
      icon: <MdOutlineOndemandVideo />,
      title: "150+ Pre Recorded Videos",
    },
  ];

  const SupportInfo = [
    {
      id: 1,
      icon: <BsBroadcast />,
      title: "Job Placement Support",
    },
    {
      id: 2,
      icon: <FaRegCalendarAlt />,
      title: "Class Recording Life Time Access",
    },
  ];

  return (
    <div className="py-[20px]">
      <div className="flex ">
        <div className="w-3/5">
          <div className="bg-danger/40 px-4 py-1 rounded-3xl text-[12px] w-fit flex items-center gap-3">
            <BsBroadcast className="text-danger" />
            <p className="text-danger">Live Support</p>
          </div>
          <h2 className="py-2 text-[24px] font-semibold">{data?.data.title}</h2>
          <p className="text-[14px]">{data?.data.description}</p>
          <div className="flex items-center gap-4 my-4">
            <Link
              href={`/checkout/${id}`}
              className="px-4 py-[6px] bg-warning text-white rounded-md font-medium text-[14px]"
            >
              Join Batch
            </Link>
            <p className="text-[22px] text-success font-bold">
              ${data.data.price}
            </p>
          </div>
          <div className="flex gap-4">
            {info.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 border border-muted rounded-lg py-1 px-4 text-[10px]"
              >
                {item.icon}
                <p className="">{item.title}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 my-4">
            {SupportInfo.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 border rounded-lg py-1 px-12 text-[12px] font-medium border-muted bg-success/5 text-success"
              >
                {item.icon}
                <p className="">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/5">
          <Image
            src={data?.data.thumbnail}
            alt=""
            width={200}
            height={200}
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
