import React from "react";
import AMC from "@components/Contests/AMC";
import { LogIn } from "@components/Firebase";

export default function Preview() {
  return (
    <div className="m-2 p-3">
      <h1 className="font-bold text-5xl dark:text-white text-center">
        <div className=" text-transparent bg-clip-text bg-blue-700 dark:bg-blue-500">
          Preview
        </div>
        <div className="text-2xl">
          <LogIn /> to preserve your progress and access{" "}
          <span className="text-transparent bg-clip-text bg-blue-700 dark:bg-blue-500">
            over 200
          </span>{" "}
          contests
        </div>
      </h1>
      <div className="md:flex md:justify-center">
        <AMC preview={true} name="2021_AMC_10A"></AMC>
      </div>
    </div>
  );
}
