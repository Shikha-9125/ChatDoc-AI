import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const [sysmtemTheme, setSystemTheme] = useState("light");
  const { theme, setTheme }: any = useTheme();
  useEffect(() => {
    const tempTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setSystemTheme(tempTheme);
    setMounted(true);
  }, []);

  console.log(theme);
  if (!mounted) return null;
  return (
    <div className="flex justify-between">
      <span>Theme</span>
      <Dropdown>
        <DropdownTrigger>
          <button className={` px-3 outline-none py-2 rounded-lg flex space-x-2 ${theme === "light" ? "hover:bg-[#ececec]  text-black" : "hover:bg-[#2f2f2f] text-white"}  `}>
            {theme?.slice(0, 1).toUpperCase() + theme?.slice(1)}
            <span className="">
              <ChevronDown />
            </span>
          </button>
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
          <DropdownItem onClick={() => {
            setTheme(sysmtemTheme)
          }} key="system">System</DropdownItem>
          <DropdownItem onClick={() => {
            setTheme('dark')
          }} key="dark">Dark</DropdownItem>
          <DropdownItem onClick={() => {
            setTheme('light')
          }} key="light">Light</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default ThemeButton;
