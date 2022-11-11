import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Information/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contest from "./components/getContest";
import { Error404 } from "./components/Errors";
import Citation from "./components/Citation";
import Info from "./components/Information/Info";
import Preview from "./components/Preview";
import Settings from "./components/Settings";
import "./lib/fonts";
import { useParams } from "react-router-dom";

function URLContest() {
  const { contest } = useParams();
  return <Contest name={contest!} />;
}

function App() {
  return (
    <div className="min-w-screen min-h-screen">
      <Router>
        <Navbar />
        <div className="mx-2 px-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/info" element={<Info />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/:contest" element={<URLContest />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Citation />
        </div>
      </Router>
    </div>
  );
}

// dark mode must be set before loading.
if (localStorage.getItem("darkmode") === "true") {
  document.body.classList.add("dark");
  document.body.classList.add("bg-gray-900");
  document.body.classList.add("text-white");
} else {
  document.body.classList.remove("dark");
  document.body.classList.remove("bg-gray-900");
  document.body.classList.remove("text-white");
}

if (process.env.NODE_ENV === "development") {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(<App />, document.getElementById("root"));
}
