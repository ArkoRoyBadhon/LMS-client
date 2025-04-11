"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRegisterMutation } from "@/lib/features/auth/AuthApi";
import { toast } from "sonner";
import { setUser } from "@/lib/features/auth/AuthSlice";
import { useAppDispatch } from "@/lib/redux.hooks";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [register] = useRegisterMutation(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be 50 characters or less")
        .required("First name is required"),
      last_name: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be 50 characters or less")
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const toastId = toast.loading("Please wait...");
      try {
        const res = await register(values);
        if (res.data.success) {
          dispatch(setUser(res.data.data));
          toast.success("Registered Successfully!", {
            duration: 2000,
            id: toastId,
          });
          router.push("/");
        }
      } catch {
        toast.error("Something went wrong!", { duration: 2000, id: toastId });
      }
    },
  });

  return (
    <section>
      <div className="mainContainer min-h-screen flex justify-center items-center">
        <div className="w-[400px] h-fit shadow-lg border-gray-200 border-[1px] p-[40px] rounded-md my-[40px]">
          <h2 className="text-center font-semibold">Sign Up Form</h2>
          <form onSubmit={formik.handleSubmit} className="mt-[20px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="first_name">First Name*</label>
              <input
                type="text"
                name="first_name"
                className="px-4 py-2 outline outline-muted rounded-md"
                placeholder="Enter first name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
              />
              {formik.touched.first_name && formik.errors.first_name ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.first_name}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="last_name">Last Name*</label>
              <input
                type="text"
                name="last_name"
                className="px-4 py-2 outline outline-muted rounded-md"
                placeholder="Enter last name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
              />
              {formik.touched.last_name && formik.errors.last_name ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.last_name}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                className="px-4 py-2 outline outline-muted rounded-md"
                placeholder="Enter email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                name="password"
                className="px-4 py-2 outline outline-muted rounded-md"
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              ) : null}
            </div>

            <div className="mt-6 mb-4">
              <input
                type="submit"
                value="Submit"
                className="bg-purple text-white px-4 py-2 rounded-md cursor-pointer hover:bg-hover smoothy w-full"
              />
            </div>
            <Link className="" href="/login">
              Already have an account? Sign in
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
