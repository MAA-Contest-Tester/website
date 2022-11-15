import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@components/Firebase";
import { Error403, Error404 } from "@components/Errors";
import { AMCExists, AIMEExists, AHSMEProblemCount } from "@lib/fetch_contests";
import Lazy from "@components/Lazy";

const getAMC = (name: string) => {
  const AMC = React.lazy(() => import("@components/Contests/AMC"));
  if (AMCExists(name)) {
    return (
      <Lazy>
        <AMC name={name} />
      </Lazy>
    );
  } else {
    return <Error404 />;
  }
};

const getAMC8 = (name: string) => {
  const AMC8 = React.lazy(() => import("@components/Contests/AMC8"));
  if (AMCExists(name)) {
    return (
      <Lazy>
        <AMC8 name={name} />
      </Lazy>
    );
  } else {
    return <Error404 />;
  }
};

const getAIME = (name: string) => {
  const AIME = React.lazy(() => import("@components/Contests/AIME"));
  if (AIMEExists(name)) {
    return (
      <Lazy>
        <AIME name={name} />
      </Lazy>
    );
  } else {
    return <Error404 />;
  }
};

const getAHSME = (name: string) => {
  const AHSME = React.lazy(() => import("@components/Contests/AHSME"));
  const length = AHSMEProblemCount(name);
  if (length) {
    return (
      <Lazy>
        <AHSME name={name} length={length} />
      </Lazy>
    );
  } else {
    return <Error404 />;
  }
};

const getAJHSME = (name: string) => {
  const AJHSME = React.lazy(() => import("@components/Contests/AJHSME"));
  const length = AHSMEProblemCount(name);
  if (length) {
    return (
      <Lazy>
        <AJHSME name={name} length={length} />
      </Lazy>
    );
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
