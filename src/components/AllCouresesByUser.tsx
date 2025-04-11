"use client";
import { useUserPersonalQuery } from "@/lib/features/enrollment/EnrollmentApi";
import Link from "next/link";
import Image from "next/image";

const AllCoursesByUser = () => {
  const { data, isSuccess, isLoading } = useUserPersonalQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isSuccess || !data || data.length === 0) {
    return <p>No courses found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] py-[20px]">
      {data.data.map((item: any, index: number) => {
        console.log("item", item);

        return (
          <div
            key={index}
            className="border rounded-2xl overflow-hidden cursor-pointer"
          >
            <Link href={`/dashboard/${item._id}`}>
              <div>
                <Image
                  src={item.thumbnail || "/tiger.jpg"}
                  className="w-full h-[200px] object-cover"
                  height={200}
                  width={240}
                  alt={item.title || "Course Image"}
                />
                <div className="py-6 px-4">
                  <h4 className="font-semibold">
                    {item.title || "Course Title"}
                  </h4>
                  <p className="mt-2">
                    <strong>Price: </strong>
                    <span>{item.price ? `$${item.price}` : "Free"}</span>
                  </p>
                  <p className="mt-2 text-gray-600 text-sm">
                    {item.description ||
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
