import React from "react";

export function Blue(props: { children?: React.ReactNode }) {
  return (
    <span className="text-blue-700 dark:text-blue-500">{props.children}</span>
  );
}
export function Yellow(props: { children?: React.ReactNode }) {
  return (
    <span className="dark:text-yellow-400 text-yellow-600">
      {props.children}
    </span>
  );
}

export default function Block(props: {
  name?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className={"flex flex-col md:flex-row justify-center my-5"}>
      {props.name ? (
        <h2 className="font-bold text-2xl md:text-3xl max-w-4xl flex-1 flex items-center justify-center m-2 p-3">
          <div className="text-center">{props.name}</div>
        </h2>
      ) : null}
      <div
        className={`bg-gray-100 dark:bg-gray-800 dark:text-white rounded-xl ${
          props.name ? "max-w-3xl" : "max-w-6xl"
        } flex-1 m-2 p-3 flex items-center`}
      >
        {props.children}
      </div>
    </div>
  );
}
