"use client";
import { useGetUserQuery } from "@/lib/features/auth/AuthApi";
import { useAppDispatch } from "@/lib/redux.hooks";
import { useEffect } from "react";
import { setUser } from "@/lib/features/auth/AuthSlice";

const AuthChecker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isSuccess } = useGetUserQuery(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data && data.data) {
      dispatch(setUser(data?.data));
    }
  }, [isSuccess, data, dispatch]);

  return <>{children}</>;
};

export default AuthChecker;
