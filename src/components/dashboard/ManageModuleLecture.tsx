"use client";
import React, { useState } from "react";
import {
  useDeleteCourseMutation,
  useGetSingleCourseQuery,
} from "@/lib/features/course/courseApi";
import Loader from "../Loader";
import { ILecture, IModule } from "@/Types/EnrollmentType";
import Image from "next/image";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  useDeleteLectureMutation,
  useDeleteModuleMutation,
} from "@/lib/features/module-lecture/module-lectureApi";

const ManageModuleLecture = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetSingleCourseQuery(id);
  const [deleteCourse] = useDeleteCourseMutation(undefined);
  const [deleteLecture] = useDeleteLectureMutation(undefined);
  const [deleteModule] = useDeleteModuleMutation(undefined);
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  if (isLoading || isDeleting) return <Loader />;
  if (error) return <div>Error loading course data.</div>;

  const course = data?.data;

  const handleDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Deleting course...");
    try {
      await deleteCourse(id).unwrap();
      toast.success("Course deleted successfully!", { id: toastId });
      router.push("/dashboard");
    } catch {
      setIsDeleting(false);
      toast.error("An error occurred while deleting the course.", {
        id: toastId,
      });
    }
  };
  const handleDeleteModule = async (id: string) => {
    const toastId = toast.loading("Deleting Module...");
    try {
      await deleteModule(id).unwrap();
      toast.success("Module deleted successfully!", { id: toastId });
    } catch {
      toast.error("An error occurred while deleting the Module.", {
        id: toastId,
      });
    }
  };
  const handleDeleteLecture = async (id: string) => {
    const toastId = toast.loading("Deleting lecture...");
    try {
      await deleteLecture(id).unwrap();
      toast.success("Lecture deleted successfully!", { id: toastId });
    } catch {
      toast.error("An error occurred while deleting the lecture.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Modules and Lectures</h1>

      <div className="relative bg-gray-100 p-4 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-bold">{course?.title}</h2>
        <p className="text-gray-700">{course?.description}</p>
        <Image
          src={course?.thumbnail}
          alt={course?.title}
          width={200}
          height={200}
          className="w-full max-w-sm rounded-md mt-4"
        />
        <div className="absolute top-[20px] right-[20px] flex gap-2">
          <button
            onClick={() => router.push(`/dashboard/course/update/${id}`)}
            className="px-4 py-2 outline outline-primary text-primary hover:bg-primary hover:text-white rounded-md flex items-center gap-2 smoothy cursor-pointer"
          >
            <FaEdit /> <span className="hidden lg:block">Edit Course</span>
          </button>
          <button
            onClick={() => handleDelete()}
            className=" px-4 py-2 bg-danger hover:bg-danger/80 text-white rounded-md flex items-center gap-2 cursor-pointer"
          >
            <FaTrash /> <span className="hidden lg:block">Delete</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {course?.modules?.map((module: IModule, index: number) => (
          <div
            key={module._id}
            className="bg-white p-4 rounded-md shadow-md  border-[1px] border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div className="">
                <h3 className="text-lg font-semibold">
                  {module.title}{" "}
                  {module.isPublished ? "(Published)" : "(Draft)"}
                </h3>
                <p className="text-[14px]">Number: {index + 1}</p>
              </div>
              <div className=" flex flex-col gap-2">
                <Link
                  href={`/dashboard/lecture/create/${module?._id}`}
                  className="px-4 py-2 bg-purple hover:bg-purple/80 text-white rounded-md flex items-center gap-2 cursor-pointer text-[12px] lg:text-[14px]"
                >
                  <FaPlus /> Add Lecture
                </Link>
                <Link
                  href={`/dashboard/module/${module._id}?purpose=update`}
                  className="px-4 py-2 bg-purple hover:bg-purple/80 text-white rounded-md flex items-center gap-2 cursor-pointer text-[12px] lg:text-[14px]"
                >
                  <FaEdit /> Update Module
                </Link>
                <button
                  onClick={() => handleDeleteModule(module._id)}
                  className="px-4 py-2 bg-danger hover:bg-danger/80 text-white rounded-md flex items-center gap-2 cursor-pointer text-[12px] lg:text-[14px]"
                >
                  <FaTrash /> Delete Module
                </button>
              </div>
            </div>

            {/* Lectures */}
            {module.lectures.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {module.lectures.map((lecture: ILecture) => (
                  <li
                    key={lecture._id}
                    className="p-3 bg-gray-100 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-md font-medium">
                        {lecture.title}{" "}
                        {lecture.isPublished ? "(Published)" : "(Draft)"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Free Preview: {lecture.isFreePreview ? "Yes" : "No"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Is Published: {lecture.isPublished ? "Yes" : "No"}
                      </p>
                      <a
                        href={lecture.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline text-sm"
                      >
                        Watch Video
                      </a>
                      <div className="text-sm mt-2">
                        PDFs:{" "}
                        {lecture.pdf_urls.map((pdf: string, index: number) => (
                          <a
                            key={index}
                            href={pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline mx-1"
                          >
                            PDF {index + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/lecture/update/${lecture?._id}`}
                        className="px-3 py-2 bg-warning hover:bg-warning/80 text-white rounded-md mr-2 cursor-pointer"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteLecture(lecture._id)}
                        className="px-3 py-2 bg-danger hover:bg-danger/80 text-white rounded-md cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-3">No lectures added yet.</p>
            )}
          </div>
        ))}
        <Link
          href={`/dashboard/module/${id}?purpose=create`}
          className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md flex items-center gap-2 cursor-pointer w-fit text-[12px] lg:text-[14px]"
        >
          <FaPlus /> Add Module
        </Link>
      </div>
    </div>
  );
};

export default ManageModuleLecture;
