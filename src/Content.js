import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import Sample1 from "./pages/Sample1";
import Sample2 from "./pages/Sample2";
import Sample3 from "./pages/Sample3";
import Sample4 from "./pages/Sample4";

function Content() {
  return (
    <div className="lg:col-start-2 lg:col-end-7 w-full bg-red-100 pt-52">
      <h3>Content</h3>
      <Router>
        <Routes>
          <Route exact path="/" element={<FrontPage />} />
          <Route path="/sample1" element={<Sample1 />} />
          <Route path="/sample2" element={<Sample2 />} />
          <Route path="/sample3" element={<Sample3 />} />
          <Route path="/sample4" element={<Sample4 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Content;
