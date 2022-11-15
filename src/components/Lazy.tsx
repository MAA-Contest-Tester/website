import React, { Suspense } from "react";

export default function Lazy(props: { children?: any }) {
  return <Suspense fallback={<h2>Loading...</h2>}>{props.children}</Suspense>;
}
