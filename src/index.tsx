import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navbar from "@components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetContest from "@components/getContest";
import "@lib/fonts";
import { useParams } from "react-router-dom";
import Lazy from "@components/Lazy";
import Citation from "@components/Citation";
import AuthProvider from "@components/AuthProvider";

function URLContest() {
  const { contest } = useParams();
  return <GetContest name={contest!} />;
}

function App() {
  const Home = React.lazy(() => import("@components/Information/Home"));
  const Dashboard = React.lazy(() => import("@components/Dashboard"));
  const Preview = React.lazy(() => import("@components/Preview"));
  const Info = React.lazy(() => import("@components/Information/Info"));
  const Settings = React.lazy(() => import("@components/Settings"));
  const Error404 = React.lazy(() => import("@components/Errors"));
  return (
    <AuthProvider>
      <div className="min-w-screen min-h-screen">
        <Router>
          <Navbar />
          <div className="mx-2 px-5">
            <Routes>
              <Route
                path="/"
                element={
                  <Lazy>
                    <Home />
                  </Lazy>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Lazy>
                    <Dashboard />
                  </Lazy>
                }
              />
              <Route
                path="/preview"
                element={
                  <Lazy>
                    <Preview />
                  </Lazy>
                }
              />
              <Route
                path="/info"
                element={
                  <Lazy>
                    <Info />
                  </Lazy>
                }
              />
              <Route
                path="/settings"
                element={
                  <Lazy>
                    <Settings />
                  </Lazy>
                }
              />
              <Route
                path="/:contest"
                element={
                  <Lazy>
                    <URLContest />
                  </Lazy>
                }
              />
              <Route
                path="*"
                element={
                  <Lazy>
                    <Error404 />
                  </Lazy>
                }
              />
            </Routes>
            <Citation />
          </div>
        </Router>
      </div>
    </AuthProvider>
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
