import React from "react";
import AMCCutoffs from "../data/cutoffs/amc.json";

enum ScoreStatus {
  Nothing,
  AIME,
  DHR,
}

function GetStatus(name: string, score: string) {
  const cutoffs = AMCCutoffs as any;
  const [points] = score.split("/");
  let status;
  if (points >= cutoffs[name]["DHR"]) {
    status = ScoreStatus.DHR;
  } else if (points >= cutoffs[name]["AIME"]) {
    status = ScoreStatus.AIME;
  } else {
    status = ScoreStatus.Nothing;
  }
  return [status, cutoffs[name]["AIME"], cutoffs[name]["DHR"]];
}

export default function ScoreBox(props: { name: string; score: string }) {
  const cutoffs = AMCCutoffs as any;
  if (!cutoffs[props.name]) {
    return null;
  }
  const [status, aime_cutoff, dhr_cutoff] = GetStatus(props.name, props.score);
  const message = new Map<ScoreStatus, React.ReactNode>([
    [
      ScoreStatus.Nothing,
      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
        Fell Short!
      </div>,
    ],
    [
      ScoreStatus.AIME,
      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
        AIME!
      </div>,
    ],
    [
      ScoreStatus.DHR,
      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
        DHR!
      </div>,
    ],
  ]);
  return (
    <div className="bg-gray-100 dark:bg-gray-800 shadow-xl hover:shadow-2xl my-2 mx-3 md:mx-6 p-3 w-36 rounded-xl">
      {message.get(status)}
      <hr />
      <div className="text-xl font-bold dark:text-white"> Cutoffs </div>
      <div className="text-xl dark:text-white"> AIME: {aime_cutoff} </div>
      <div className="text-xl dark:text-white"> DHR: {dhr_cutoff} </div>
    </div>
  );
}
