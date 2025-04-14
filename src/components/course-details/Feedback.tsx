"use client";
import React from "react";
import { FaStar } from "react-icons/fa";

const feedbackData = [
  {
    id: 1,
    name: "Alice Johnson",
    feedback:
      "This platform has transformed the way I learn. The live classes and progress tracking are fantastic!",
    role: "Software Engineer (Client)",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Brown",
    feedback:
      "The projects were very hands-on and practical. I feel confident applying my skills in real-world scenarios.",
    role: "UI/UX Designer (Client)",
    rating: 4,
  },
  {
    id: 3,
    name: "Sophia Davis",
    feedback:
      "I loved the community support and the certification at the end. It added great value to my resume!",
    role: "Data Analyst (Client)",
    rating: 5,
  },
  {
    id: 4,
    name: "David Wilson",
    feedback:
      "The study plan was very detailed and easy to follow. It kept me on track throughout the course.",
    role: "Marketing Manager (Client)",
    rating: 4,
  },
  {
    id: 5,
    name: "Emma Taylor",
    feedback:
      "The pre-recorded videos were a lifesaver! I could learn at my own pace without feeling overwhelmed.",
    role: "Freelance Developer (Client)",
    rating: 5,
  },
];

const Feedback = () => {
  return (
    <div className="my-20">
      <h4 className="font-bold text-xl lg:text-3xl text-center mb-10 text-darkest">
        What Our Clients Say
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbackData.map((feedback) => (
          <div
            key={feedback.id}
            className="flex flex-col gap-4 p-6 bg-primary/20 rounded-2xl shadow-md text-darkest"
          >
            <p className="text-[16px] lg:text-[18px] font-semibold">
              {feedback.name}
            </p>
            <p className="text-[14px] lg:text-[16px] text-gray-700">
              {feedback.role}
            </p>
            <p className="text-[12px] lg:text-[14px] text-gray-500 italic">
              {`"${feedback.feedback}"`}
            </p>
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < feedback.rating ? "fill-current" : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
