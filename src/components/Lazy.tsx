import React, { Suspense } from "react";

function Loading() {
  return <h2 className="font-bold text-center text-2xl m-5">Loading...</h2>;
}

export default function Lazy(props: { children?: any }) {
  return <Suspense fallback={<Loading />}>{props.children}</Suspense>;
}
