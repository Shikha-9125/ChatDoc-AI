import React from "react";
import AcceptSVG from "./accept-svg";
import { X } from "lucide-react";
import { Button } from "@nextui-org/react";

function ProKit() {
  return (
    <>
      <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
        <h3 className="mb-4 text-2xl font-semibold">Pro</h3>
        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          Relevant for multiple users, extended & premium support.
        </p>
        <div className="flex justify-center items-baseline my-8">
          <span className="mr-2 text-5xl font-extrabold">$25</span>
          <span className="text-gray-500 dark:text-gray-400">/month</span>
        </div>
        <ul role="list" className="mb-8 space-y-4 text-left">
          <li className="flex items-center space-x-3">
            <AcceptSVG />
            <span>Custom Theme</span>
          </li>
          <li className="flex items-center space-x-3">
            <AcceptSVG />
            <span>20 PDF / 1000 pages per pdf</span>
          </li>
          <li className="flex items-center space-x-3">
            <AcceptSVG />
            <span>50 Images / 5 MB per image</span>
          </li>
          <li className="flex items-center space-x-3">
            <AcceptSVG />
            <span>Unlimited chat</span>
          </li>
          <li className="flex items-center space-x-3">
            <AcceptSVG />
            <span>Live collabration</span>
          </li>
          <li className="flex items-center space-x-3">
            <AcceptSVG />
            <span>Export chat</span>
          </li>
        </ul>
        <Button className="w-full" color="primary">
          Get started
        </Button>
      </div>
    </>
  );
}

export default ProKit;
