"use client";
import Image from "next/image";
import React from "react";

const dummydata = [
  {
    id: 1,
    icon: "/icon/calender.png",
    title: "6 Months Study Plan",
    description:
      "A comprehensive study plan tailored to help you achieve your goals within 6 months.",
  },
  {
    id: 2,
    icon: "/icon/live.png",
    title: "44 Live Classes",
    description:
      "Interactive live classes with expert instructors to enhance your learning experience.",
  },
  {
    id: 3,
    icon: "/icon/project.png",
    title: "12+ Projects",
    description:
      "Hands-on projects to apply your skills and build an impressive portfolio.",
  },
  {
    id: 4,
    icon: "/icon/video.png",
    title: "100+ Pre-recorded Videos",
    description:
      "Access a library of high-quality pre-recorded lessons for self-paced learning.",
  },
  {
    id: 5,
    icon: "/icon/tracking.png",
    title: "Progress Tracking",
    description:
      "Monitor your learning progress with our advanced tracking tools.",
  },
  {
    id: 6,
    icon: "/icon/certificate.png",
    title: "Certification",
    description:
      "Earn a valuable certificate upon successful completion of the course.",
  },
  {
    id: 7,
    icon: "/icon/support.png",
    title: "Community Support",
    description:
      "Join a vibrant community to collaborate, share, and learn together.",
  },
];

const GotComponent = () => {
  return (
    <div className="my-20">
      <h4 className="font-bold text-xl lg:text-3xl text-center mb-10 text-darkest">
        What You Have Got
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummydata.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-4 p-6 bg-primary/30 rounded-2xl shadow-md text-darkest"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={40}
              height={40}
              className="w-[40px] h-[40px]"
            />
            <p className="font-semibold text-[16px] lg:text-[18px] text-center">
              {item.title}
            </p>
            <p className="text-[12px] lg:text-[14px] text-center text-gray-700">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GotComponent;
