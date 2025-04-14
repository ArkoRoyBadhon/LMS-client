"use client";
import { useGetCoursesQuery } from "@/lib/features/course/courseApi";
import Loader from "./Loader";
import Image from "next/image";
import { ICourse } from "@/Types/EnrollmentType";
import Link from "next/link";

const CoursesComponent = () => {
  const { data, isLoading, isSuccess } = useGetCoursesQuery(undefined);
  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess) {
    return (
      <>
        {data?.data.map((item: ICourse, index: number) => {
          return (
            <div
              key={index}
              className="border rounded-2xl overflow-hidden cursor-pointer"
            >
              <Link href={`/courses/${item._id}`}>
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
        })}
      </>
    );
  }
  return;
};

export default CoursesComponent;
