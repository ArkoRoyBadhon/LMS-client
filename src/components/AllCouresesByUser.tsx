"use client";
import { useUserPersonalQuery } from "@/lib/features/enrollment/EnrollmentApi";
import Link from "next/link";
import Image from "next/image";
import { IEnrollment } from "@/Types/EnrollmentType";
import Loader from "./Loader";

const AllCoursesByUser = () => {
  const { data, isSuccess, isLoading } = useUserPersonalQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  if (!isSuccess || !data || data.length === 0) {
    return <p>No courses found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] py-[20px]">
      {data.data.map((item: IEnrollment, index: number) => {
        return (
          <div
            key={index}
            className="border rounded-2xl overflow-hidden cursor-pointer"
          >
            <Link href={`/dashboard/${item._id}`}>
              <div>
                <Image
                  src={item?.course?.thumbnail || "/tiger.jpg"}
                  className="w-full h-[200px] object-cover"
                  height={200}
                  width={240}
                  alt={item.course?.title || "Course Image"}
                />
                <div className="py-6 px-4">
                  <h4 className="font-semibold">
                    {item.course?.title || "Course Title"}
                  </h4>
                  <p className="mt-2">
                    <strong>Price: </strong>
                    <span>{item.course?.price} $</span>
                  </p>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                    {item.course?.description ||
                      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, asperiores."}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllCoursesByUser;
