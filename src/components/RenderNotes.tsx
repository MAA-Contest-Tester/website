import React from "react";
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/dist/contrib/auto-render";

export default function RenderNotes(props: { text?: string | null }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) {
      renderMathInElement(ref.current, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
        ],
      });
    }
  });
  if (!props.text) {
    return null;
  }
  return (
    <div
      ref={ref}
      className="max-h-44 bg-gray-100 dark:bg-gray-800 shadow-xl hover:shadow-2xl my-2 mx-3 md:mx-6 p-3 rounded-xl overflow-scroll max-w-xl whitespace-pre-line"
    >
      {props.text}
    </div>
  );
}
