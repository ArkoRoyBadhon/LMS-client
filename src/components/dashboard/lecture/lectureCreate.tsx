"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useCreateLectureMutation } from "@/lib/features/module-lecture/module-lectureApi";
import { useRouter } from "next/navigation";
import { useMultiUploadFileMutation } from "@/lib/features/file/fileApi";
import BackButton from "@/components/shared/BackButton";

const LectureCreate = ({ id }: { id: string }) => {
  const initialValues = {
    title: "",
    video_url: "",
    pdfs: [],
    isFreePreview: false,
    isPublished: false,
  };

  const [createLecture] = useCreateLectureMutation();
  const [multiUploadFile] = useMultiUploadFileMutation();
  const router = useRouter();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    video_url: Yup.string()
      .url("Invalid URL")
      .required("Video URL is required"),
    pdfs: Yup.array()
      .of(Yup.mixed().required("PDF file is required"))
      .min(1, "At least one PDF file is required"),
    isFreePreview: Yup.boolean(),
    isPublished: Yup.boolean(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const toastId = toast.loading("Uploading files...");
    try {
      const formData = new FormData();
      values.pdfs.forEach((file) => formData.append("files", file));

      const uploadedFiles = await multiUploadFile(formData).unwrap();
      const pdf_urls = uploadedFiles.urls;

      const lectureData = {
        title: values.title,
        video_url: values.video_url,
        isFreePreview: values.isFreePreview,
        isPublished: values.isPublished,
        pdf_urls,
        module: id,
      };
      await createLecture(lectureData).unwrap();

      toast.success("Lecture created successfully!", { id: toastId });
      router.back();
    } catch {
      toast.error("Failed to create lecture.", { id: toastId });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <BackButton />
      <h1 className="text-xl font-bold mb-4">Create Lecture</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
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

            {/* PDF Upload */}
            <div>
              <label className="block text-gray-700 font-medium">
                PDF Files
              </label>
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={(event) =>
                  setFieldValue("pdfs", Array.from(event.target.files || []))
                }
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md"
              />
              <ErrorMessage
                name="pdfs"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <div className="mt-2 text-sm text-gray-500">
                Selected files: {values.pdfs.length}
              </div>
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
