"use client";

import { useLogoutUserMutation } from "@/lib/features/auth/AuthApi";
import { logout } from "@/lib/features/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux.hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const HandleLogout = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [logoutUser] = useLogoutUserMutation(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div>
      {user ? (
        <div className="">
          <Link className="navItem smoothy mr-4" href="/dashboard">
            Dashboard
          </Link>
          <button
            className="uppercase text-darkest font-semibold cursor-pointer hover:text-danger smoothy text-[14px] md:text-[18px]"
            onClick={async () => {
              const toastId = toast.loading("Loging out...");
              try {
                await logoutUser(undefined);
                dispatch(logout());
                toast.success("Logged out successfully", {
                  id: toastId,
                });
                router.push("/");
              } catch {
                toast.error("Logged out Failed", {
                  id: toastId,
                });
              }
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/signup"
          className="uppercase bg-light-accent px-8 py-2 rounded-2xl font-semibold hover:bg-hover cursor-pointer hover:text-text smoothy text-[14px] md:text-[18px]"
        >
          Sign Up
        </Link>
      )}
    </div>
  );
};

export default HandleLogout;
