/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { LogOutIcon, Settings2, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import toast from "react-hot-toast";
import SettingButton from "./settings";
import { ThemeSwitcher } from "@/components/ui/theme-switch";
import Image from "next/image";
import { useTheme } from "next-themes";
function ProfileIcon({ user }: any) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  return (
    <>
      <div className="ml-3">
        <Popover size="sm" placement="bottom">
          <PopoverTrigger className="hover:cursor-pointer">
            <div className={` ${theme === "light" ? "hover:bg-[#ececec] text-black" : "hover:bg-[#2f2f2f] text-white"} px-2 mb-2   py-2 items-center rounded-lg flex gap-2 `} >
              <img className="rounded-full object-contain h-8 w-8" alt="profile.png" src={`${user?.photoURL}`} />
              <span>{user?.displayName}</span>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-4 py-2">
              <div className="my-6">
                <p className="w-80 font-bold text-xl ">{user?.displayName}</p>
                {user?.imageURL}
                <p className=" text-gray-500">{user?.email}</p>
              </div>
              <div className="my-2" >
                <SettingButton />
              </div>
              <div className="my-2">
                <Button
                  onClick={() => {
                    signOut(auth);
                    toast.success("Logout user...");
                    router.push("/");
                  }}
                  size="sm"
                  color="danger"
                  className="w-full flex justify-start"
                  startContent={<LogOutIcon size={20} />}
                >
                  Log out
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default ProfileIcon;
