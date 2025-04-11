"use client";

import { useSingleForUserQuery } from "@/lib/features/enrollment/EnrollmentApi";
import { ILecture, IModule } from "@/Types/EnrollmentType";
import React, { useState } from "react";

const ProjectViewer = ({ id }: { id: string }) => {
  const { data, isLoading, isSuccess } = useSingleForUserQuery(id);
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [openLecture, setOpenLecture] = useState<ILecture | null>(null);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (!isSuccess || !data?.data?.course?.modules)
    return <p>No data available.</p>;

  const { modules } = data.data.course;

  return (
    <div className="flex gap-4">
      {/* Lecture Viewer */}
      <div className="w-2/3">
        {openLecture ? (
          <>
            <h3 className="font-semibold text-lg">{openLecture.title}</h3>
            <iframe
              width="560"
              height="315"
              src={openLecture.video_url}
              title={openLecture.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-[calc(100vh-240px)] rounded-md"
              allowFullScreen
            ></iframe>
          </>
        ) : (
          <p>Select a lecture to view details.</p>
        )}
      </div>

      <div className="w-1/3 bg-gray-200 min-h-[400px] h-[calc(100vh-200px)] rounded-md p-6 overflow-auto">
        <h3 className="font-semibold text-lg mb-4">Modules</h3>
        <div>
          {modules.length > 0 ? (
            modules.map((module: IModule) => (
              <div key={module._id} className="my-4">
                {/* Module Title */}
                <button
                  className="font-semibold text-left w-full p-2 bg-gray-300 rounded-md"
                  onClick={() => toggleModule(module._id)}
                >
                  {module.title}
                </button>

                {/* Lectures */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openModules.includes(module._id) ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <ul className="list-disc pl-4 mt-2">
                    {module.lectures.length > 0 ? (
                      module.lectures.map((lecture: ILecture) => (
                        <li
                          key={lecture._id}
                          className="cursor-pointer hover:underline"
                          onClick={() => setOpenLecture(lecture)}
                        >
                          {lecture.title}
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-500">
                        No lectures available.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p>No modules available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectViewer;
