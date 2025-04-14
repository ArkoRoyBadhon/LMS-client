"use client";
import { useGetUserQuery } from "@/lib/features/auth/AuthApi";
import { useAppDispatch } from "@/lib/redux.hooks";
import { useEffect } from "react";
import { setUser } from "@/lib/features/auth/AuthSlice";
import { useRouter } from "next/navigation";
import Loader from "../Loader";

const AuthChecker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { data, isSuccess, isLoading, isError, error } =
    useGetUserQuery(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setUser(data?.data));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError && (error as { status: number })?.status === 401) {
      router.push("/login");
    }
  }, [isError, error, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError && (error as { status: number })?.status === 401) {
    return null;
  }

  return <>{children}</>;
};

export default AuthChecker;
