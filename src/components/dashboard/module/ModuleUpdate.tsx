"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import {
  useGetSingleModuleQuery,
  useUpdateModuleMutation,
} from "@/lib/features/module-lecture/module-lectureApi";
import { useRouter } from "next/navigation";
import BackButton from "@/components/shared/BackButton";

const ModuleUpdate = ({ id }: { id: string }) => {
  const { data: moduleData, isLoading } = useGetSingleModuleQuery(id);
  const [updateModule] = useUpdateModuleMutation();
  const router = useRouter();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    isPublished: Yup.boolean(),
  });

  if (isLoading || !moduleData) {
    return <div className="p-6">Loading module...</div>;
  }

  const initialValues = {
    title: moduleData?.data.title || "",
    isPublished: moduleData?.data.isPublished || false,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const toastId = toast.loading("Updating module...");
    try {
      await updateModule({ ...values, _id: id }).unwrap();
      toast.success("Module updated successfully!", { id: toastId });
      router.back();
    } catch {
      toast.error("Failed to update module.", { id: toastId });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <BackButton />
      <h1 className="text-xl font-bold mb-4">Update Module</h1>
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

            <div className="flex items-center">
              <Field type="checkbox" name="isPublished" className="mr-2" />
              <label className="text-gray-700 font-medium">Is Published</label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-purple text-white rounded-md hover:bg-purple/80 transition"
            >
              {isSubmitting ? "Updating..." : "Update Module"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ModuleUpdate;
