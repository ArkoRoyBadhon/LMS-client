"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const questionsData = [
  {
    id: 1,
    question: "What is the duration of the course?",
    answer:
      "The course duration is 6 months, including live classes, projects, and certifications.",
  },
  {
    id: 2,
    question: "Can I access the course materials after completion?",
    answer:
      "Yes, you will have lifetime access to all pre-recorded videos and downloadable resources.",
  },
  {
    id: 3,
    question: "Are there any prerequisites for this course?",
    answer:
      "No prerequisites are required. Our course is designed for beginners as well as advanced learners.",
  },
  {
    id: 4,
    question: "What kind of projects will I work on?",
    answer:
      "You will work on real-world projects such as web applications, data analysis dashboards, and more.",
  },
  {
    id: 5,
    question: "Is there any refund policy?",
    answer:
      "Yes, we offer a refund within the first 14 days if you're not satisfied with the course.",
  },
];

const CommonQuestions = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="my-20">
      <h4 className="font-bold text-xl lg:text-3xl text-center mb-10 text-darkest">
        Common Questions
      </h4>
      <div className="space-y-4">
        {questionsData.map((item) => (
          <div
            key={item.id}
            className={`p-4  rounded-lg shadow-md ${
              expanded === item.id
                ? "outline outline-warning"
                : "outline outline-gray-100"
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(item.id)}
            >
              <p className="font-semibold text-lg text-darkest">
                {item.question}
              </p>
              {expanded === item.id ? (
                <FaChevronUp className="text-darkest" />
              ) : (
                <FaChevronDown className="text-darkest" />
              )}
            </div>
            <div
              className={`mt-2 overflow-hidden transition-all duration-300 ${
                expanded === item.id
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-darkest text-sm">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonQuestions;
