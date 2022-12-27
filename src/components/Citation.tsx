import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Citation() {
  return (
    <>
      <div className="m-1 p-3 rounded-xl flex-1 text-center">
        <div className="flex flex-row flex-wrap justify-center gap-2">
          <a href="https://blog.maatester.com" target="_blank" rel="noreferrer">
            <button className="transition duration-100 bg-gradient-to-r from-gray-100 to-gray-400 text-white rounded-full p-3 transform hover:-translate-y-1 shadow-lg">
              <FontAwesomeIcon
                icon={["fab", "wordpress"]}
                className="text-black text-4xl"
              />
            </button>
          </a>
          <a
            href="https://www.youtube.com/channel/UC8hoATFdyqpN1ZUfrduqyCg"
            target="_blank"
            rel="noreferrer"
          >
            <button className="transition duration-100 bg-gradient-to-r from-gray-100 to-gray-400 text-white rounded-full p-3 transform hover:-translate-y-1 shadow-lg">
              <FontAwesomeIcon
                icon={["fab", "youtube"]}
                className="text-black text-4xl"
              />
            </button>
          </a>
          <a
            href="https://github.com/MAA-Contest-Tester"
            target="_blank"
            rel="noreferrer"
          >
            <button className="transition duration-100 bg-gradient-to-r from-gray-600 to-black text-white rounded-full p-3 transform hover:-translate-y-1 shadow-lg">
              <FontAwesomeIcon
                icon={["fab", "github"]}
                className="text-white text-4xl"
              />
            </button>
          </a>
          <a
            href="mailto:maatesterapp703@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <button className="transition duration-100 bg-gradient-to-r from-gray-100 to-gray-400 text-white rounded-full p-3 transform hover:-translate-y-1 shadow-lg">
              <FontAwesomeIcon
                icon={"envelope"}
                className="text-black text-4xl"
              />
            </button>
          </a>
        </div>
      </div>
      <div className="text-gray-400 m-2 p-3 text-center">
        © 2021-{new Date().getFullYear()} Juni C. Kim and Tei D. Kim
      </div>
    </>
  );
}
