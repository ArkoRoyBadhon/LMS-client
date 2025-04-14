"use client";

import {
  useNextVideoMutation,
  useSingleForUserQuery,
} from "@/lib/features/enrollment/EnrollmentApi";
import { ILecture, IModule } from "@/Types/EnrollmentType";
import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp, BiSearch } from "react-icons/bi";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { toast } from "sonner";
import Loader from "../Loader";
import Link from "next/link";

const ProjectViewer = ({ id }: { id: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isSuccess, refetch } = useSingleForUserQuery({
    id,
    search: searchTerm,
  });

  const [openModules, setOpenModules] = useState<string[]>([]);
  const [openLecture, setOpenLecture] = useState<ILecture | null>(null);
  const [nextVideo, { isLoading: isNextVideoLoading }] = useNextVideoMutation();

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = new FormData(e.currentTarget).get(
      "searchVal"
    ) as string;
    setSearchTerm(searchValue);
    await refetch();
  };

  useEffect(() => {
    if (data?.data?.course?.modules) {
      setOpenLecture(data?.data?.course?.modules[0]?.lectures[0]);
    }
  }, [isSuccess, data]);

  const handleNextVideo = async (id: string, lectureId: string) => {
    const isLast =
      data?.data?.accessibleVideos[data?.data?.accessibleVideos.length - 1] ===
      lectureId;

    if (id && isLast) {
      const { data: fetchedData } = await nextVideo({ id });
      if (fetchedData?.data) {
        setOpenLecture(fetchedData.data);
      }
    } else {
      const nextV =
        data?.data?.accessibleVideos[
          data?.data?.accessibleVideos.indexOf(lectureId) + 1
        ];
      const findModule = data?.data?.course?.modules.find((m: IModule) =>
        m.lectures.some((l: ILecture) => l._id === nextV)
      );

      if (findModule) {
        const nextLecture = findModule.lectures.find(
          (l: ILecture) => l._id === nextV
        );

        if (nextLecture) {
          setOpenLecture(nextLecture);
        }
      }
    }
  };

  if (isLoading) return <Loader />;
  if (!isSuccess || !data?.data?.course?.modules)
    return <p>No data available.</p>;

  const { modules } = data.data.course;

  const accessibleVideoCount = data?.data?.accessibleVideos?.filter(
    (videoId: string) =>
      data?.data?.course?.modules?.some((module: IModule) =>
        module.lectures.some((lecture: ILecture) => lecture._id === videoId)
      )
  ).length;

  const totalVideo = data?.data?.course?.modules?.reduce(
    (total: number, module: IModule) => total + module.lectures.length,
    0
  );

  return (
    <div>
      <h2 className="text-[24px] font-semibold capitalize">
        {data?.data?.course?.title}
      </h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-2/3 h-[calc(100vh-160px)]">
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
                className="w-full h-[calc(100vh-260px)] rounded-md border border-gray-300"
                allowFullScreen
              ></iframe>
              <div className="flex justify-end mt-4 text-white">
                <button
                  onClick={() => handleNextVideo(id, openLecture._id)}
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

        <div className="lg:w-1/3 bg-gray-200 min-h-[400px] h-[calc(100vh-160px)] rounded-md p-6 overflow-auto">
          <h3 className="font-semibold text-lg mb-4">All Lectures</h3>
          <h4 className="">
            Progress: {accessibleVideoCount} / {totalVideo}
          </h4>
          <div className="w-full bg-gray-300 rounded-md h-4 mb-4">
            <div
              className="bg-purple h-4 rounded-md transition-all duration-300"
              style={{
                width: `${(accessibleVideoCount / totalVideo) * 100}%`,
              }}
            ></div>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              name="searchVal"
              className="outline outline-gray-300 w-full p-2 rounded-md"
              placeholder="Search lecture.."
            />
            <button
              type="submit"
              className="bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
            >
              <BiSearch />
            </button>
          </form>
          <div>
            {modules.length > 0 ? (
              modules.filter((module: IModule) => module.lectures.length > 0)
                .length > 0 ? (
                modules
                  .filter((module: IModule) => module.lectures.length > 0)
                  .map((module: IModule, index: number) => (
                    <div key={module._id} className="my-4">
                      <button
                        className={`font-semibold text-left w-full p-2  rounded-md flex justify-between capitalize items-center ${
                          module.lectures.find(
                            (item) => item._id === openLecture?._id
                          )
                            ? "bg-primary text-text"
                            : "bg-gray-300"
                        }`}
                        onClick={() => toggleModule(module._id)}
                      >
                        {index + 1} - {module.title}
                        {openModules.includes(module._id) ? (
                          <BiChevronUp />
                        ) : (
                          <BiChevronDown />
                        )}
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden capitalize ${
                          openModules.includes(module._id)
                            ? "max-h-96"
                            : "max-h-0"
                        }`}
                      >
                        <ul className="list-disc pl-4 mt-2">
                          {module.lectures.map((lecture: ILecture) => (
                            <li
                              key={lecture._id}
                              className={`cursor-pointer  px-4 py-2 rounded-md  ${
                                openLecture?._id === lecture._id
                                  ? "bg-primary/50"
                                  : ""
                              }`}
                            >
                              <div
                                onClick={() =>
                                  data.data.accessibleVideos.includes(
                                    lecture._id
                                  )
                                    ? setOpenLecture(lecture)
                                    : toast.warning(
                                        "You don't have access to this video"
                                      )
                                }
                                className="flex justify-between hover:underline"
                              >
                                {lecture.title}
                                {data.data.accessibleVideos.includes(
                                  lecture._id
                                ) ? (
                                  <FaLockOpen />
                                ) : (
                                  <FaLock />
                                )}
                              </div>
                              <div className="flex flex-col">
                                {lecture?.pdf_urls.map(
                                  (pdf: string, i: number) => (
                                    <div
                                      key={pdf}
                                      className="flex justify-between items-center"
                                    >
                                      <p>PDF {i + 1}</p>
                                      <div className="flex gap-4">
                                        <Link
                                          href={pdf}
                                          target="_blank"
                                          download={pdf}
                                          className="text-primary hover:underline"
                                        >
                                          Download
                                        </Link>

                                        <Link
                                          href={`/pdf-view/?pdf=${pdf}`}
                                          target="_blank"
                                          className="text-primary hover:underline"
                                        >
                                          View
                                        </Link>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
              ) : (
                <p>No modules or lectures found.</p>
              )
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
