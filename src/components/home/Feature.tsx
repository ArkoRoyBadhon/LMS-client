"use client";
import React from "react";
import { FaVideo, FaChalkboardTeacher, FaCertificate } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaVideo className="text-primary text-4xl" />,
      title: "High-Quality Courses",
      description:
        "Access a wide range of courses with top-notch video content.",
    },
    {
      id: 2,
      icon: <FaChalkboardTeacher className="text-primary text-4xl" />,
      title: "Expert Instructors",
      description:
        "Learn from industry experts with years of teaching experience.",
    },
    {
      id: 3,
      icon: <FaCertificate className="text-primary text-4xl" />,
      title: "Certification",
      description:
        "Receive a recognized certificate after completing each course.",
    },
  ];

  return (
    <div className="mainContainer py-20 px-5">
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-5xl font-bold text-darkest">
          Why Choose Us
        </h2>
        <p className="text-gray-600 mt-4">
          Discover the benefits of learning with us.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-md"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-darkest">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
