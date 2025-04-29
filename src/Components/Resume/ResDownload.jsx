import React, { useRef } from "react";
import "./ResDownload.css"
import html2pdf from "html2pdf.js";
import ResumeTemplate1 from "./ResumeTemplate1";
import ResumeTemplate2 from "./ResumeTemplate2";

const ResumeDownload = ({ selectedTemplate }) => {
  const resumeRef = useRef(null);

  const handleDownload = () => {
    if (resumeRef.current) {
      const options = {
        margin: [0, 0, 0, 0],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };
      

      html2pdf().set(options).from(resumeRef.current).save();
    }
  };
  

  return (
    <div   className="resume-wrapper">
      <button  onClick={handleDownload} style={{border:"none",padding:"10px",borderRadius:"5px",backgroundColor:"#4a90e2",color:"white",cursor:"pointer",justifyContent:"center"}}>
        Download Resume
      </button>
      <div
        ref={resumeRef}
      
    
      >
        {selectedTemplate === "template1" ? <ResumeTemplate1 /> : <ResumeTemplate2 />}
      </div>
    </div>
  );
};

export default ResumeDownload;
