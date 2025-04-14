"use client";
import Image from "next/image";
import React from "react";

const instructorData = [
  {
    id: 1,
    name: "John Doe",
    role: "Full Stack Developer",
    description:
      "John is a seasoned developer with over 10 years of experience in building robust web applications.",
    image: "/instructors/instructor1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "UI/UX Designer",
    description:
      "Jane specializes in crafting intuitive and beautiful user interfaces with a focus on user experience.",
    image: "/instructors/instructor2.jpg",
  },
  {
    id: 3,
    name: "David Lee",
    role: "Data Scientist",
    description:
      "David has a deep understanding of data analytics and machine learning, with numerous successful projects.",
    image: "/instructors/instructor3.jpg",
  },
];

const Instructor= () => {
  return (
    <div className="my-20">
      <h4 className="font-bold text-xl lg:text-3xl text-center mb-10 text-darkest">
        Meet Our Instructors
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructorData.map((instructor) => (
          <div
            key={instructor.id}
            className="flex flex-col items-center gap-4 p-6 bg-success/30 rounded-2xl shadow-md text-darkest"
          >
            <Image
              src={instructor.image}
              alt={instructor.name}
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-full"
            />
            <p className="font-semibold text-[16px] lg:text-[18px] text-center">
              {instructor.name}
            </p>
            <p className="text-[14px] lg:text-[16px] text-center text-gray-700">
              {instructor.role}
            </p>
            <p className="text-[12px] lg:text-[14px] text-center text-gray-500">
              {instructor.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructor;
