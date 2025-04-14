import Image from "next/image";
import { BsBroadcast } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaListOl, FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { ICourse2 } from "@/Types/EnrollmentType";

const CourseIntro = ({ data }: { data: ICourse2 }) => {
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
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      <div className="lg:w-3/5">
        <div className="bg-danger/40 px-4 py-1 rounded-3xl text-[12px] w-fit flex items-center gap-3 ">
          <BsBroadcast className="text-danger" />
          <p className="text-danger">Live Support</p>
        </div>
        <h2 className="py-2 text-[20px] md:text-[34px] font-semibold capitalize text-darkest">
          {data?.title}
        </h2>
        <p className="text-[14px] capitalize text-darkest">
          {data?.description}
        </p>
        <div className="flex items-center gap-4 my-4">
          <Link
            href={`/checkout/${data?._id}`}
            className="px-4 py-[6px] bg-warning text-white rounded-md font-medium text-[14px]"
          >
            Join Batch
          </Link>
          <p className="text-[22px] text-success font-bold">${data?.price}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {info.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 border border-muted rounded-lg py-1 px-4 text-[12px] text-darkest font-medium"
            >
              {item.icon}
              <p className="">{item?.title}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 my-4">
          {SupportInfo.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 border rounded-lg py-1 px-12 text-[14px] font-medium border-muted bg-success/5 text-success"
            >
              {item.icon}
              <p className="">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-2/5">
        <Image
          src={data?.thumbnail}
          alt=""
          width={200}
          height={200}
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default CourseIntro;
