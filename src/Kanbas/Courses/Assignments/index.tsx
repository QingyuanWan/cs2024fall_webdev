import { useParams } from "react-router";
import AssigmentControls from "./AssigmentControls";
import { BsGripVertical } from "react-icons/bs";
import AssigmentItemControlsButton from "./AssigmentItemControlsButton";
import AssigmentTileControlsButton from "./AssigmentTileControlsButton";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";



interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };



  
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentForModules(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);





  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const { assignments } = useSelector((state: any) => state.assignments);




  const handleDeleteAssignment = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      removeAssignment(assignmentId);
    }
  };

  return (
    <div id="wd-assignments">
      {currentUser.role === "FACULTY" && (
      <AssigmentControls />
    )}
      <br /><br />

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
              .map((assignment: Assignment) => (
                <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />

                  {currentUser.role === "FACULTY" && (
                  <FaRegPenToSquare
                    className="me-2 fs-3 text-success"
                    onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`, { state: { assignment } })}
                  />
)}


                  <div className="d-flex flex-column me-auto">
                  {currentUser.role === "FACULTY" && (
                    <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="text-decoration-none">
                      <span>{assignment.title}</span>
                    </Link>
                    )}
                    {currentUser.role === "STUDENT" && (
                      <span>{assignment.title}</span>
   
                    )}
                    <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                      <span className="text-danger">Multiple Modules</span> |
                      <span className="fw-bold"> Available from:</span> {assignment.availableFrom || "N/A"} |
                      <span className="fw-bold"> Due:</span> {assignment.dueDate || "N/A"} | {assignment.points || "100"} pts
                    </div>
                  </div>
                  <AssigmentItemControlsButton />


                  {currentUser.role === "FACULTY" && (
                  <FaTrash
                    className="text-danger ms-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAssignment(assignment._id)}
                  />
                )}


                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
