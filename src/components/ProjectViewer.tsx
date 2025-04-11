"use client";
import {
  useNextVideoMutation,
  useSingleForUserQuery,
} from "@/lib/features/enrollment/EnrollmentApi";
import { ILecture, IModule } from "@/Types/EnrollmentType";
import { useEffect, useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { toast } from "sonner";

const ProjectViewer = ({ id }: { id: string }) => {
  const { data, isLoading, isSuccess } = useSingleForUserQuery(id);
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [openLecture, setOpenLecture] = useState<ILecture | null>(null);

  const [nextVideo, { isLoading: isNextVideoLoading }] =
    useNextVideoMutation(undefined);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  useEffect(() => {
    if (data?.data?.course?.modules) {
      setOpenLecture(data?.data?.course?.modules[0]?.lectures[0]);
    }
  }, [isSuccess, data]);

  const handleNextVideo = async (id: string) => {
    if (id) {
      console.log("next video", id);

      const { data: fetchedData } = await nextVideo({ id });
      if (fetchedData?.data) {
        console.log(fetchedData.data);
        setOpenLecture(fetchedData.data);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!isSuccess || !data?.data?.course?.modules)
    return <p>No data available.</p>;

  const { modules } = data.data.course;

  return (
    <div className="">
      <h2 className="text-[24px] font-semibold capitalize mb-2">
        {data?.data?.course?.title}
      </h2>
      <div className="flex gap-4">
        <div className="w-2/3">
          {openLecture ? (
            <>
              <h3 className="font-semibold text-lg pb-2">
                {openLecture.title}
              </h3>
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
              <div className="flex justify-end mt-4 text-white">
                <button
                  onClick={() => handleNextVideo(id)}
                  disabled={isNextVideoLoading}
                  className="bg-primary rounded-md px-4 py-2 hover:bg-hover smoothy cursor-pointer"
                >
                  {isNextVideoLoading ? "Loading..." : "Next Video"}
                </button>
              </div>
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
                  <button
                    className="font-semibold text-left w-full p-2 bg-gray-300 rounded-md"
                    onClick={() => toggleModule(module._id)}
                  >
                    {module.title}
                  </button>

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
                            className="cursor-pointer hover:underline py-4 pr-2 flex justify-between"
                            onClick={() =>
                              data.data.accessibleVideos.includes(lecture._id)
                                ? setOpenLecture(lecture)
                                : toast.warning(
                                    "You don't have access to this video"
                                  )
                            }
                          >
                            {lecture.title}
                            {data.data.accessibleVideos.includes(
                              lecture._id
                            ) ? (
                              <FaLockOpen />
                            ) : (
                              <FaLock />
                            )}
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
    </div>
  );
};

export default ProjectViewer;
