import React, { useState } from "react";
import "./Resume.css";
import ResumeTemplate1 from "./ResumeTemplate1";
import ResumeTemplate2 from "./ResumeTemplate2";
import ResumeDownload from "./ResDownload";

const Resume = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  return (
    <div className="resume-container">
      {/* <h1 className="text-2xl font-bold mb-4">Resume Template</h1> */}

      <div className="template-buttons">
        <button onClick={() => setSelectedTemplate("template1")}>Resume Template</button>
        {/* <button onClick={() => setSelectedTemplate("template2")}>Template 2</button> */}
      </div>

      <div className="resume-preview">
        {selectedTemplate === "template1" ? <ResumeTemplate1 /> : <ResumeTemplate2 />}
      </div>

      <ResumeDownload selectedTemplate={selectedTemplate} />
    </div>
  );
};

export default Resume;

