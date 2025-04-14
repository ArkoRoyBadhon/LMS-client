"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useCreateModuleMutation } from "@/lib/features/module-lecture/module-lectureApi";
import { useRouter } from "next/navigation";
import BackButton from "@/components/shared/BackButton";

const ModuleCreate = ({ id }: { id: string }) => {
  const initialValues = {
    title: "",
    position: 1,
    isPublished: false,
  };
  const [CreateModule] = useCreateModuleMutation(undefined);
  const router = useRouter();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    isPublished: Yup.boolean(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const toastId = toast.loading("Creating module...");
    try {
      const post = { ...values, course: id };
      await CreateModule(post).unwrap();

      toast.success("Module created successfully!", { id: toastId });
      router.push(`/dashboard/manage/${id}`);
    } catch {
      toast.error("Failed to create module.", { id: toastId });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <BackButton />
      <h1 className="text-xl font-bold mb-4">Create Module</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
              {isSubmitting ? "Creating..." : "Create Module"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ModuleCreate;
