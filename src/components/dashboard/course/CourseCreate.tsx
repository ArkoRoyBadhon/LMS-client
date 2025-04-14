"use client";

import BackButton from "@/components/shared/BackButton";
import { useCreateCourseMutation } from "@/lib/features/course/courseApi";
import { useUploadFileMutation } from "@/lib/features/file/fileApi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";

const CourseCreate = () => {
  const [createCourse] = useCreateCourseMutation();
  const [uploadFile] = useUploadFileMutation();
  const router = useRouter();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    thumbnail: Yup.mixed().required("Thumbnail is required"),
    price: Yup.number()
      .positive("Price must be positive")
      .required("Price is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const toastId = toast.loading("Creating course...");
    try {
      let thumbnailUrl = values.thumbnail;

      if (typeof values.thumbnail !== "string") {
        const formData = new FormData();
        formData.append("file", values.thumbnail);

        const uploadedFile = await uploadFile(formData).unwrap();
        thumbnailUrl = uploadedFile?.url;
      }

      await createCourse({ ...values, thumbnail: thumbnailUrl }).unwrap();
      toast.success("Course created successfully!", { id: toastId });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course.", { id: toastId });
    }
  };

  const initialValues = {
    title: "",
    description: "",
    thumbnail: "",
    price: "",
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <BackButton />
      <h1 className="text-xl mt-2 font-bold mb-4">Create Course</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
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
                Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  setFieldValue("thumbnail", file || "");
                }}
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
              {isSubmitting ? "Creating..." : "Create Course"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CourseCreate;
