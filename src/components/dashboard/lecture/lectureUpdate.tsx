"use client";

import Loader from "@/components/Loader";
import {
  useGetSingleLectureQuery,
  useUpdateLectureMutation,
} from "@/lib/features/module-lecture/module-lectureApi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";
import { useMultiUploadFileMutation } from "@/lib/features/file/fileApi";
import BackButton from "@/components/shared/BackButton";

const LectureUpdate = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data: lecture, isLoading } = useGetSingleLectureQuery(id);
  const [updateLecture] = useUpdateLectureMutation();
  const [multiUploadFile] = useMultiUploadFileMutation();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    video_url: Yup.string()
      .url("Enter a valid URL")
      .required("Video URL is required"),
    pdfs: Yup.array().of(Yup.mixed()),
    isFreePreview: Yup.boolean(),
    isPublished: Yup.boolean(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const toastId = toast.loading("Updating lecture...");
    try {
      let pdf_urls = values.pdf_urls || [];

      if (values.pdfs.length > 0) {
        const formData = new FormData();
        values.pdfs.forEach((file: File) => formData.append("files", file));
        const uploadedFiles = await multiUploadFile(formData).unwrap();
        pdf_urls = [...pdf_urls, ...uploadedFiles.urls];
      }

      const lectureData = {
        title: values.title,
        video_url: values.video_url,
        isFreePreview: values.isFreePreview,
        isPublished: values.isPublished,
        pdf_urls,
        _id: id,
      };

      await updateLecture({ id, ...lectureData }).unwrap();
      toast.success("Lecture updated successfully!", { id: toastId });
      router.back();
    } catch {
      toast.error("Failed to update lecture.", { id: toastId });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const initialValues = {
    title: lecture?.data?.title || "",
    video_url: lecture?.data?.video_url || "",
    pdfs: [],
    pdf_urls: lecture?.data?.pdf_urls || [],
    isFreePreview: lecture?.data?.isFreePreview || false,
    isPublished: lecture?.data?.isPublished || false,
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <BackButton />
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
                Upload New PDFs
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
            </div>

            {values.pdf_urls?.length > 0 && (
              <div>
                <h4 className="text-gray-700 font-medium">Existing PDFs</h4>
                <ul className="space-y-2">
                  {values.pdf_urls.map((url: string, index: number) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md gap-2"
                    >
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline line-clamp-2"
                      >
                        {/* PDF {index + 1} */}
                        {url}
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            "pdf_urls",
                            values.pdf_urls.filter(
                              (_: unknown, i: number) => i !== index
                            )
                          )
                        }
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
