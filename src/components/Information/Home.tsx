import React from "react";
import { Link } from "react-router-dom";

import Block, { Blue, Yellow } from "./Block";

export default function Home() {
  return (
    <>
      <div className="m-2 p-3 dark:text-white">
        <div className="text-center">
          <img src="/images/Logo.png" alt="Logo" className="w-20 mx-5 inline" />
        </div>
        <h1 className="font-bold text-center text-5xl dark:text-white">
          The MAA{" "}
          <span className=" text-transparent bg-clip-text bg-blue-700 dark:bg-blue-500">
            Contest Tester
          </span>
        </h1>
        <div className="flex flex-row flex-wrap justify-center">
          <div className="m-2 p-3 text-lg md:text-xl max-w-2xl text-center">
            An integrated testing environment designed to help you achieve your
            math contest goals by automatically{" "}
            <span className="font-bold">organizing your progress</span> on your
            practice contests
          </div>
        </div>
        <div className="m-2 p-3 flex flex-row flex-wrap justify-center">
          <Link to="/preview">
            <button className="transition duration-100 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-4 m-2 text-2xl md:text-3xl transform hover:-translate-y-1 shadow-lg font-bold">
              Preview
            </button>
          </Link>
        </div>
        <div className="m-2 p-3">
          <h1 className="text-center dark:text-white font-bold">
            {" "}
            Download the Desktop Client{" "}
          </h1>
          <div className="m-2 p-1 flex flex-row flex-wrap justify-center">
            <a href="https://github.com/MAA-Contest-Tester/desktop/releases/download/14d4c44/maa-tester-1.0.0.dmg">
              <button className="transition duration-100 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-xl p-4 m-2 text-2xl md:text-3xl transform hover:-translate-y-1 shadow-lg font-bold">
                <img src="/images/Apple.png" className="h-9" alt="Apple Logo" />
              </button>
            </a>
            <a href="https://github.com/MAA-Contest-Tester/desktop/releases/download/14d4c44/maa-tester.Setup.1.0.0.exe">
              <button className="transition duration-100 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-xl p-4 m-2 text-2xl md:text-3xl transform hover:-translate-y-1 shadow-lg font-bold">
                <img
                  src="/images/Windows.png"
                  className="h-9"
                  alt="Windows Logo"
                />
              </button>
            </a>
            <a href="https://github.com/MAA-Contest-Tester/desktop/releases/download/14d4c44/maa-tester-1.0.0.AppImage">
              <button className="transition duration-100 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-xl p-4 m-2 text-2xl md:text-3xl transform hover:-translate-y-1 shadow-lg font-bold">
                <img src="/images/Linux.png" className="h-9" alt="Linux Logo" />
              </button>
            </a>
          </div>
        </div>
        <Block
          name={
            <div>
              <Blue>Extensive</Blue> Contest Support
            </div>
          }
        >
          <span className="font-bold text-md md:text-xl">
            <ul>
              <li>
                <Blue> All AMC 8 </Blue> Contests (1999 -)
              </li>
              <li>
                <Blue> All AMC 10/12 </Blue> Contests (2000 -){" "}
              </li>
              <li>
                <Blue> All AIME</Blue> Contests (1983 -){" "}
              </li>
              <li>
                <Blue>
                  {" "}
                  <Yellow>New!</Yellow> All AJHSME
                </Blue>{" "}
                Contests (1985 - 1998){" "}
              </li>
              <li>
                <Blue>
                  {" "}
                  <Yellow>New!</Yellow> All AHSME
                </Blue>{" "}
                Contests (1973 - 1999){" "}
              </li>
            </ul>
          </span>
        </Block>
        <Block
          name={
            <div>
              A <Blue> Systematic </Blue> Practice Workflow
            </div>
          }
        >
          <span className="font-bold text-md md:text-xl">
            <ul>
              <li>
                <Blue>Automated</Blue> Contest Grading
              </li>
              <li>
                <Blue>Autosaved</Blue> Progress
              </li>
              <li> Levels and Achievements </li>
            </ul>
          </span>
        </Block>
      </div>
    </>
  );
}
