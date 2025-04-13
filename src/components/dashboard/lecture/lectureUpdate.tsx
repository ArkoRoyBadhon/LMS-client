"use client";

import Loader from "@/components/Loader";
import {
  useGetSingleLectureQuery,
  useUpdateLectureMutation,
} from "@/lib/features/module-lecture/module-lectureApi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";
import * as Yup from "yup";

const LectureUpdate = ({ id }: { id: string }) => {
  const { data: lecture, isLoading, error } = useGetSingleLectureQuery(id);
  const [updateLecture] = useUpdateLectureMutation();
  const router = useRouter();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    video_url: Yup.string()
      .url("Enter a valid URL")
      .required("Video URL is required"),
    pdf_urls: Yup.array()
      .of(Yup.string().url("Enter valid URLs"))
      .required("At least one PDF URL is required"),
    isFreePreview: Yup.boolean(),
    isPublished: Yup.boolean(),
  });

  const handleSubmit = async (values: typeof lecture) => {
    const toastId = toast.loading("Please wait...");
    try {
      const updatedLecture = { ...values, _id: id };
      await updateLecture(updatedLecture);
      toast.success("Lecture updated successfully!", { id: toastId });
      router.back();
    } catch {
      console.error("Error updating lecture:", error);
      toast.error("Failed to update lecture.", { id: toastId });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const initialValues = {
    title: lecture?.data?.title || "",
    video_url: lecture?.data?.video_url || "",
    pdf_urls: lecture?.data?.pdf_urls || [""],
    isFreePreview: lecture?.data?.isFreePreview || false,
    isPublished: lecture?.data?.isPublished || false,
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <button onClick={() => router.back()}>
        <FaArrowLeft />
      </button>
      <h1 className="text-xl mt-2 font-bold mb-4">Update Lecture</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Title</label>
              <Field
                type="text"
                name="title"
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Video URL
              </label>
              <Field
                type="text"
                name="video_url"
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md"
              />
              <ErrorMessage
                name="video_url"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                PDF URLs
              </label>
              <Field
                type="text"
                name="pdf_urls"
                placeholder="Enter comma-separated URLs"
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md"
                value={values.pdf_urls.join(", ")}
                onChange={(e: { target: { value: string } }) =>
                  setFieldValue(
                    "pdf_urls",
                    e.target.value.split(",").map((url) => url.trim())
                  )
                }
              />
              <ErrorMessage
                name="pdf_urls"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex items-center">
              <Field type="checkbox" name="isFreePreview" className="mr-2" />
              <label className="text-gray-700 font-medium">
                Free Preview Available
              </label>
            </div>

            <div className="flex items-center">
              <Field type="checkbox" name="isPublished" className="mr-2" />
              <label className="text-gray-700 font-medium">Published</label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-purple text-white rounded-md hover:bg-purple/80 transition"
            >
              {isSubmitting ? "Updating..." : "Update Lecture"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LectureUpdate;
