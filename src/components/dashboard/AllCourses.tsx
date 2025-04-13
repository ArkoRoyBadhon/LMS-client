import React from "react";
import Loader from "../Loader";
import { useGetCoursesQuery } from "@/lib/features/course/courseApi";
import { ICourse } from "@/Types/EnrollmentType";
import Link from "next/link";
import Image from "next/image";

const AllCourses = () => {
  const { data, isLoading, isSuccess } = useGetCoursesQuery(undefined);
  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess) {
    return (
      <>
        {data?.data.length > 0 ? (
          data?.data.map((item: ICourse, index: number) => {
            return (
              <div
                key={index}
                className="border rounded-2xl overflow-hidden cursor-pointer"
              >
                <Link href={`/dashboard/manage/${item._id}`}>
                  <Image
                    src={item.thumbnail}
                    className="w-full h-[200px]"
                    height={400}
                    width={240}
                    alt=""
                  />
                  <div className="py-6 px-4">
                    <h4 className="">{item.title}</h4>
                    <p className="">
                      <strong>Price: </strong>{" "}
                      <span className="">{item.price}$</span>
                    </p>
                    <hr className="my-2" />
                    <p className="">{item.description}</p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="text-center w-full">
            <h3 className="text-3xl font-semibold text-primary py-[20px]">
              No Courses Found
            </h3>
          </div>
        )}
      </>
    );
  }
};

export default AllCourses;
