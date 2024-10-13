import { useParams } from "react-router";
import * as db from "../../Database";
import AssigmentControls from "./AssigmentControls";
import { BsGripVertical } from "react-icons/bs";
import AssigmentItemControlsButton from "./AssigmentItemControlsButton";
import AssigmentTileControlsButton from "./AssigmentTileControlsButton";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
    return (

      <div id="wd-assignments">
        <AssigmentControls /><br /><br />


        <ul id="wd-modules" className="list-group rounded-0">

              <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
            <BsGripVertical className="me-2 fs-3" />
            <AiOutlineCaretDown className="me-2 fs-5" />
            Assignment
            <AssigmentTileControlsButton />
            </div>

            <ul className="wd-lessons list-group rounded-0">
            {assignments
            .filter((assignments: any) => assignments.course === cid)
            .map((assignments: any) => (
              <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegPenToSquare className="me-2 fs-3 text-success" />
              <div className="d-flex flex-column me-auto">
                <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignments._id}`} className="text-decoration-none">
                    <span className="">{assignments.title}</span>
                </Link>
                <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                    <span className="text-danger"> Mutiple Modules </span> |
                    <span className="fw-bold"> Not aviable until</span> END OF TEH WROLD |<br />
                    <span className="fw-bold"> Due</span> After world end | 100 pts
                  </div>
              </div>
              <AssigmentItemControlsButton />
              </li>
        ))}
        </ul>
      </li>
    </ul>          {/* <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
            <BsGripVertical className="me-2 fs-3" />
            <AiOutlineCaretDown className="me-2 fs-5" />

            ASSIGNMENTS
            <AssigmentTileControlsButton />
            </div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegPenToSquare className="me-2 fs-3 text-success" />
              <div className="d-flex flex-column me-auto">
                <Link to="/Kanbas/Courses/1234/Assignments/123" className="text-decoration-none">
                    <span className="">A1 - ENV + HTML</span>
                </Link>
                <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                    <span className="text-danger"> Mutiple Modules </span> |
                    <span className="fw-bold"> Not aviable until</span> END OF TEH WROLD |<br />
                    <span className="fw-bold"> Due</span> After world end | 100 pts
                  </div>
              </div>
              <AssigmentItemControlsButton />
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegPenToSquare className="me-2 fs-3 text-success" />
              <div className="d-flex flex-column me-auto">
                <Link to="/Kanbas/Courses/1234/Assignments/123" className="text-decoration-none">
                    <span className="">A2 - CSS + BOOTSTRAP</span>
                </Link>
                <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                    <span className="text-danger"> Mutiple Modules </span> |
                    <span className="fw-bold"> Not aviable until</span> END OF TEH WROLD |<br />
                    <span className="fw-bold"> Due</span> After world end | 100 pts
                  </div>
              </div>

              <AssigmentItemControlsButton />
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegPenToSquare className="me-2 fs-3 text-success" />
              <div className="d-flex flex-column me-auto">
                <Link to="/Kanbas/Courses/1234/Assignments/123" className="text-decoration-none">
                    <span className="">A3 - JAVASCRIPT + REACT</span>
                </Link>
                <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                    <span className="text-danger"> Mutiple Modules </span> |
                    <span className="fw-bold"> Not aviable until</span> END OF TEH WROLD |<br />
                    <span className="fw-bold"> Due</span> After world end | 100 pts
                  </div>
              </div>
              
                <AssigmentItemControlsButton /> </li>
            </ul>
          </li>


          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
            <BsGripVertical className="me-2 fs-3" />
            <AiOutlineCaretDown className="me-2 fs-5" />
            PROJECT
            <AssigmentTileControlsButton />
             </div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegPenToSquare className="me-2 fs-3 text-success" />
              
              <div className="d-flex flex-column me-auto">
                <Link to="/Kanbas/Courses/1234/Assignments/123" className="text-decoration-none">
                    <span className="">P1 - Build Kanbas</span>
                </Link>
                <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                    <span className="text-danger"> Mutiple Modules </span> |
                    <span className="fw-bold"> Not aviable until</span> END OF TEH WROLD |<br />
                    <span className="fw-bold"> Due</span> After world end | 100 pts
                  </div>
              </div>
                <AssigmentItemControlsButton />
                </li>
              <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center"> 
              <BsGripVertical className="me-2 fs-3" />
              <FaRegPenToSquare className="me-2 fs-3 text-success" />
              <div className="d-flex flex-column me-auto">
                <Link to="/Kanbas/Courses/1234/Assignments/123" className="text-decoration-none">
                    <span className="">P2 - Build Fosbuuk</span>
                </Link>
                <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                    <span className="text-danger"> Mutiple Modules </span> |
                    <span className="fw-bold"> Not aviable until</span> END OF TEH WROLD |<br />
                    <span className="fw-bold"> Due</span> After world end | 100 pts
                  </div>
              </div>
              <AssigmentItemControlsButton />
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center"> 
              <BsGripVertical className="me-2 fs-3" />
              <FaRegPenToSquare className="me-2 fs-3 text-success" />
              <div className="d-flex flex-column me-auto">
                <Link to="/Kanbas/Courses/1234/Assignments/123" className="text-decoration-none">
                    <span className="">P3 - Build Gulugulu</span>
                </Link>
                <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                    <span className="text-danger"> Mutiple Modules </span> |
                    <span className="fw-bold"> Not aviable until</span> END OF TEH WROLD |<br />
                    <span className="fw-bold"> Due</span> After world end | 100 pts
                  </div>
              </div>
              <AssigmentItemControlsButton />
               </li>
            </ul>
          </li>
        </ul> */}



        
      </div>
  );}
  