"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useCreateLectureMutation } from "@/lib/features/module-lecture/module-lectureApi";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const LectureCreate = ({ id }: { id: string }) => {
  const initialValues = {
    title: "",
    video_url: "",
    pdf_urls: [""],
    isFreePreview: false,
    isPublished: false,
  };

  const [createLecture] = useCreateLectureMutation(undefined);
  const router = useRouter();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    video_url: Yup.string()
      .url("Invalid URL")
      .required("Video URL is required"),
    pdf_urls: Yup.array().of(
      Yup.string().url("Invalid PDF URL").required("PDF URL is required")
    ),
    isFreePreview: Yup.boolean(),
    isPublished: Yup.boolean(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const toastId = toast.loading("Creating lecture...");
    try {
      const lectureData = { ...values, module: id };
      await createLecture(lectureData).unwrap();

      toast.success("Lecture created successfully!", { id: toastId });
      router.back();
    } catch {
      toast.error("Failed to create lecture.", { id: toastId });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <button onClick={() => router.back()} className="">
        <FaArrowLeft />
      </button>
      <h1 className="text-xl font-bold mb-4">Create Lecture</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Title */}
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

            {/* Video URL */}
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

            {/* PDF URLs */}
            <div>
              <label className="block text-gray-700 font-medium">
                PDF URLs
              </label>
              <FieldArray name="pdf_urls">
                {({ push, remove, form }) => (
                  <>
                    {form.values.pdf_urls.map((_: any, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Field
                          name={`pdf_urls[${index}]`}
                          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="mt-2 px-4 py-2 bg-purple text-white rounded-md hover:bg-purple/80 transition"
                    >
                      Add PDF URL
                    </button>
                  </>
                )}
              </FieldArray>
              <ErrorMessage
                name="pdf_urls"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Free Preview */}
            <div className="flex items-center">
              <Field type="checkbox" name="isFreePreview" className="mr-2" />
              <label className="text-gray-700 font-medium">Free Preview</label>
            </div>

            {/* Is Published */}
            <div className="flex items-center">
              <Field type="checkbox" name="isPublished" className="mr-2" />
              <label className="text-gray-700 font-medium">Is Published</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-purple text-white rounded-md hover:bg-purple/80 transition"
            >
              {isSubmitting ? "Creating..." : "Create Lecture"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LectureCreate;
