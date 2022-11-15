import React from "react";
import AMC from "./Contests/AMC";
import AMC8 from "./Contests/AMC8";
import AIME from "./Contests/AIME";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@components/Firebase";
import { Error403, Error404 } from "@components/Errors";
import {
  AMCExists,
  AIMEExists,
  AHSMEProblemCount,
} from "../lib/fetch_contests";
import AHSME from "./Contests/AHSME";
import AJHSME from "./Contests/AJHSME";

const getAMC = (name: string) => {
  if (AMCExists(name)) {
    return <AMC name={name} />;
  } else {
    return <Error404 />;
  }
};

const getAMC8 = (name: string) => {
  if (AMCExists(name)) {
    return <AMC8 name={name} />;
  } else {
    return <Error404 />;
  }
};

const getAIME = (name: string) => {
  if (AIMEExists(name)) {
    return <AIME name={name} />;
  } else {
    return <Error404 />;
  }
};

const getAHSME = (name: string) => {
  const length = AHSMEProblemCount(name);
  if (length) {
    return <AHSME name={name} length={length} />;
  } else {
    return <Error404 />;
  }
};

const getAJHSME = (name: string) => {
  const length = AHSMEProblemCount(name);
  if (length) {
    return <AJHSME name={name} length={length} />;
  } else {
    return <Error404 />;
  }
};

export default function Contest(props: { name: string; preview?: boolean }) {
  const [user] = useAuthState(auth);
  const preview = props.preview ? props.preview : false;
  if (!user && !preview) {
    return <Error403 />;
  }
  if (props.name.match(/AMC_8/)) {
    return getAMC8(props.name);
  } else if (props.name.match(/AMC/)) {
    return getAMC(props.name);
  } else if (props.name.match(/AJHSME/)) {
    return getAJHSME(props.name);
  } else if (props.name.match(/AHSME/)) {
    return getAHSME(props.name);
  } else {
    return getAIME(props.name);
  }
}
