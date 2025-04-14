"use client";

import Loader from "@/components/Loader";
import BackButton from "@/components/shared/BackButton";
import {
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
} from "@/lib/features/course/courseApi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";

const CourseUpdate = ({ id }: { id: string }) => {
  const { data: course, isLoading, error } = useGetSingleCourseQuery(id);
  const [updateCourse] = useUpdateCourseMutation();
  const router = useRouter();
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    thumbnail: Yup.string()
      .url("Enter a valid URL")
      .required("Thumbnail URL is required"),
    price: Yup.number()
      .positive("Price must be positive")
      .required("Price is required"),
  });

  const handleSubmit = async (values: typeof course) => {
    const toastId = toast.loading("Please wait...");
    try {
      const post = {
        ...values,
        _id: id,
      };
      await updateCourse(post);
      toast.success("Course updated successfully!", { id: toastId });
      router.push("/dashboard");
    } catch {
      console.error("Error updating course:", error);
      alert("Failed to update course.");
      toast.error("Failed to update course.", { id: toastId });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const initialValues = {
    title: course?.data?.title || "",
    description: course?.data?.description || "",
    thumbnail: course?.data?.thumbnail || "",
    price: course?.data?.price || "",
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <BackButton />
      <h1 className="text-xl  mt-2 font-bold mb-4">Update Course</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
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
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Thumbnail URL
              </label>
              <Field
                type="text"
                name="thumbnail"
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md"
              />
              <ErrorMessage
                name="thumbnail"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Price</label>
              <Field
                type="number"
                name="price"
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-purple text-white rounded-md hover:bg-purple/80 transition"
            >
              {isSubmitting ? "Updating..." : "Update Course"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CourseUpdate;
