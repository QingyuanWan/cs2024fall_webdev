// export default function CourseStatus() {
//     return (
//       <div id="wd-course-status">
//         <h2>Course Status</h2>
//         <button>Unpublish</button> <button>Publish</button>

//         <button>Import Existing Content</button>
//         <button>Import from Commons</button>


//         <button>Choose Home Page</button>
//         <button>View Course Stream</button>
//         <button>New Announcement</button>
//         <button>New Analytics</button>

//         <button>View Course Notifications</button>
//       </div>
//   );}

import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiOutlineHome } from "react-icons/ai";
import { FaStream } from "react-icons/fa";
import { MdOutlineAnnouncement } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import "./index.css";

{/* Find more icons */}
export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }} className="ms-4">
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish </button>
        </div>
      </div><br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <AiOutlineHome className="me-2 fs-5" /> Choose Home Page </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaStream className="me-2 fs-5" /> View Course Stream </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <MdOutlineAnnouncement className="me-2 fs-5" /> New Announcement </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <MdOutlineAnalytics className="me-2 fs-5" /> New Analytics </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoIosNotifications className="me-2 fs-5" /> View Course Notifications </button>
      {/* Complete the rest of the buttons */}
    </div>
);}
