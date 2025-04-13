"use client";

import { useGetSingleCourseQuery } from "@/lib/features/course/courseApi";
import React from "react";
import Loader from "../Loader";
import Image from "next/image";
import { useCreateEnrollmentMutation } from "@/lib/features/enrollment/EnrollmentApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { THttpError, THttpResponse } from "@/Types/ResponseError";

const CheckoutComponent = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetSingleCourseQuery(id);
  const [createEnrollment] = useCreateEnrollmentMutation();
  const router = useRouter();
  if (isLoading) {
    return <Loader />;
  }

  if (error || !data?.data) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        <p>Error loading course details. Please try again later.</p>
      </div>
    );
  }

  const handleEnrollment = async () => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = (await createEnrollment({ course: id })) as
        | THttpError
        | THttpResponse
        | {
            error: {
              data: {
                message: string;
              };
            };
            success?: boolean;
          };

      if (res?.success) {
        toast.success("Enrollment successful", { id: toastId });
        router.push("/dashboard");
      } else {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch {
      toast.error("Enrollment failed", { id: toastId });
    }
  };

  const { title, description, price, thumbnail } = data.data;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Image
          src={thumbnail}
          alt={title}
          width={200}
          height={200}
          className="w-full md:w-1/3 rounded-md border"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-700 mt-2">{description}</p>
          <p className="text-lg font-bold mt-4">Price: ${price}</p>
        </div>
      </div>
      <button
        className="w-full mt-6 py-2 px-4 bg-purple text-white rounded-md hover:bg-purple/80 transition cursor-pointer"
        onClick={() => handleEnrollment()}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default CheckoutComponent;
