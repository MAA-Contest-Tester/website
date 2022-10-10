import React from "react";
import AMCCutoffs from "../data/cutoffs/amc.json";

export default function ScoreBox(props: { name: string; score: string }) {
  const cutoffs = AMCCutoffs as any;
  if (cutoffs[props.name]) {
    const [score] = props.score.split("/");
    if (score >= cutoffs[props.name]["DHR"]) {
      return (
        <h2 className="mx-3 md:mx-5 my-2 p-2 rounded-lg flex text-green-500">
          You Made DHR!
        </h2>
      );
    } else if (score >= cutoffs[props.name]["AIME"]) {
      return (
        <h2 className="mx-3 md:mx-5 my-2 p-2 rounded-lg flex text-green-500">
          AIME Qualified!
        </h2>
      );
    }
  }
  return null;
}
