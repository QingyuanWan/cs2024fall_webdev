import {  useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer"; 
import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";


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

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isNewAssignment = aid === "new";

  const assignmentData = location.state?.assignment || {
    _id: "",
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid || "",
  };

  const [assignmentName, setAssignmentName] = useState(assignmentData.title);
  const [assignmentDescription, setAssignmentDescription] = useState(assignmentData.description || "");
  const [points, setPoints] = useState(assignmentData.points || 100);
  const [dueDate, setDueDate] = useState(assignmentData.dueDate || "");
  const [availableFrom, setAvailableFrom] = useState(assignmentData.availableFrom || "");
  const [availableUntil, setAvailableUntil] = useState(assignmentData.availableUntil || "");

  const handleSave = () => {
    const newAssignment: Assignment = {
      _id: isNewAssignment ? new Date().getTime().toString() : aid || "",
      title: assignmentName,
      description: assignmentDescription,
      points,
      dueDate,
      availableFrom,
      availableUntil,
      course: cid || "",
    };
  
    if (isNewAssignment) {
      dispatch(addAssignment(newAssignment));
    } else {
      dispatch(updateAssignment(newAssignment));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => navigate(`/Kanbas/Courses/${cid}/Assignments`);

  return (
    <div id="wd-assignments-editor">
      <h6>Assignment Name</h6>
      <input
        type="text"
        className="form-control"
        value={assignmentName}
        onChange={(e) => setAssignmentName(e.target.value)}
        placeholder="Assignment Name"
      />
      <h6>Description</h6>
      <textarea
        className="form-control"
        rows={8}
        value={assignmentDescription}
        onChange={(e) => setAssignmentDescription(e.target.value)}
        placeholder="Description"
      ></textarea>
      <h6>Points</h6>
      <input
        type="number"
        className="form-control"
        value={points}
        onChange={(e) => setPoints(parseInt(e.target.value))}
        placeholder="Points"
      />
      <h6>Due Date</h6>
      <input
        type="datetime-local"
        className="form-control"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <h6>Available From</h6>
      <input
        type="datetime-local"
        className="form-control"
        value={availableFrom}
        onChange={(e) => setAvailableFrom(e.target.value)}
      />
      <h6>Available Until</h6>
      <input
        type="datetime-local"
        className="form-control"
        value={availableUntil}
        onChange={(e) => setAvailableUntil(e.target.value)}
      />

      <div className="d-flex justify-content-end mt-3">
        <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}



// export default function AssignmentEditor({
//   assignmentName,
//   setAssignmentName,
//   assignmentDescription,
//   setAssignmentDescription,
//   points,
//   setPoints,
//   dueDate,
//   setDueDate,
//   availableFrom,
//   setAvailableFrom,
//   availableUntil,
//   setAvailableUntil,
//   addAssignment,
// }: {
//   assignmentName: string;
//   setAssignmentName: (name: string) => void;
//   assignmentDescription: string;
//   setAssignmentDescription: (name: string) => void;
//   points: number;
//   setPoints: (points: number) => void;
//   dueDate: string;
//   setDueDate: (date: string) => void;
//   availableFrom: string;
//   setAvailableFrom: (date: string) => void;
//   availableUntil: string;
//   setAvailableUntil: (date: string) => void;
//   addAssignment: () => void;
// }) {
//   const { cid, aid } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isNewAssignment = aid === "new";
  
//   const asssignments: Assignment[] = assignments;

//   useEffect(() => {
//     if (!isNewAssignment) {
//       const currentAssignment = asssignments.find(
//         (assignment) => assignment._id === aid && assignment.course === cid
//       );
//       if (currentAssignment) {
//         setAssignmentName(currentAssignment.title);
//         setAssignmentDescription(currentAssignment.description || "");
//         setPoints(currentAssignment.points || 100); // Default to 100 points if undefined
//         setDueDate(currentAssignment.dueDate || "");
//         setAvailableFrom(currentAssignment.availableFrom || "");
//         setAvailableUntil(currentAssignment.availableUntil || "");
//       }
//     }
//   }, [aid, cid, isNewAssignment, setAssignmentName, setAssignmentDescription, setPoints, setDueDate, setAvailableFrom, setAvailableUntil]);

//   const handleSave = () => {
//     const newAssignment: Assignment = {
//       _id: isNewAssignment ? new Date().getTime().toString() : aid || "",
//       title: assignmentName,
//       description: assignmentDescription,
//       points: points || 100,
//       dueDate: dueDate || "",
//       availableFrom: availableFrom || "",
//       availableUntil: availableUntil || "",
//       course: cid || "",
//     };
  
//     if (isNewAssignment) {
//       dispatch(addAssignment(newAssignment));
//     } else {
//       dispatch(updateAssignment(newAssignment));
//     }
//     navigate(`/Kanbas/Courses/${cid}/Assignments`);
//   };
  
//   const handleCancel = () => navigate(`/Kanbas/Courses/${cid}/Assignments`);