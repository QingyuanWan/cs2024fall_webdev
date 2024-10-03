import Modules from "../Modules";
import CourseStatus from "./Status";
import "./index.css";
export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules />
      </div>
      <div id="wd-CourseStatus" className="d-none d-md-block wd-status-content-offset">
        <CourseStatus />
      </div>
    </div>

  );
}
