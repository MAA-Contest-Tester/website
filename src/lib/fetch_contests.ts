import AMC10Contests from "../data/contests/amc10.json";
import AMC12Contests from "../data/contests/amc12.json";
import AMC8Contests from "../data/contests/amc8.json";
import AIMEContests from "../data/contests/aime.json";
import AJHSMEContests from "../data/contests/ajhsme.json";
import AHSMEContests from "../data/contests/ahsme.json";
export const urlSeparator = "_";

export type ContestYear = { year: string; contests: string[]; length?: number };

// get all contests (array of strings)
export function getAllAMC(grade: number) {
  if (grade === 8) return AMC8Contests as ContestYear[];
  else if (grade === 10) return AMC10Contests as ContestYear[];
  return AMC12Contests as ContestYear[];
}

export function getAllAIME() {
  return AIMEContests as ContestYear[];
}

export function getAllAJHSME() {
  return AJHSMEContests as ContestYear[];
}

export function getAllAHSME() {
  return AHSMEContests as ContestYear[];
}

function existsInCategory(
  name: string,
  obj: { year: string; contests: string[]; length?: number }[]
) {
  for (const k in obj) {
    for (let i = 0; i < obj[k]["contests"].length; i++) {
      if (obj[k]["contests"][i] === name) {
        return obj[k]["length"] || true;
      }
    }
  }
  return false;
}

function getLengthFromCategory(
  name: string,
  obj: { year: string; contests: string[]; length?: number }[]
) {
  for (const k in obj) {
    for (let i = 0; i < obj[k]["contests"].length; i++) {
      if (obj[k]["contests"][i] === name) {
        return obj[k]["length"] || 0;
      }
    }
  }
  return 0;
}

export function AMCExists(name: string) {
  if (name.match(/AMC_8/)) {
    return existsInCategory(name, AMC8Contests);
  } else if (name.match(/AMC_10/)) {
    return existsInCategory(name, AMC10Contests);
  } else if (name.match(/AMC_12/)) {
    return existsInCategory(name, AMC12Contests);
  }
  return false;
}

export function AHSMEProblemCount(name: string): number {
  if (name.match(/AHSME/)) {
    return getLengthFromCategory(name, AHSMEContests);
  } else if (name.match(/AJHSME/)) {
    return getLengthFromCategory(name, AJHSMEContests);
  } else {
    return 0;
  }
}

export function AIMEExists(name: string) {
  return existsInCategory(name, AIMEContests);
}

export function numberOfProblems() {
  const count = (problems: number, contest: ContestYear[]) =>
    problems * contest.map((x) => x.contests.length).reduce((a, b) => a + b, 0);
  return (
    count(25, AMC8Contests) +
    count(25, AMC10Contests) +
    count(25, AMC12Contests) +
    count(15, AIMEContests)
  );
}
