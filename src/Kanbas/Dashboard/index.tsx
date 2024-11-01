import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enroll, unenroll } from "./reducer";



export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);

  const toggleShowAllCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  const handleEnrollmentChange = (courseId: string) => {
    const isEnrolled = enrollments.some(
      (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId
    );

    if (isEnrolled) {
      dispatch(unenroll({ user: currentUser._id, course: courseId }));
    } else {
      dispatch(enroll({ user: currentUser._id, course: courseId }));
    }
  };

  // Show all courses for FACULTY or filter for STUDENT based on enrollment
  const displayedCourses = currentUser.role === "FACULTY"
    ? courses
    : showAllCourses
      ? courses
      : courses.filter((course) =>
          enrollments.some(
            (enrollment: any) =>
              enrollment.user === currentUser._id && enrollment.course === course._id
          )
        );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Faculty section for adding/updating courses */}
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button className="btn btn-primary float-end" onClick={addNewCourse}>
              Add
            </button>
            <button className="btn btn-warning float-end me-2" onClick={updateCourse}>
              Update
            </button>
          </h5>
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      {/* Enrollment toggle button for students */}
      {currentUser.role === "STUDENT" && (
        <button
          className="btn btn-info float-end"
          onClick={toggleShowAllCourses}
          style={{ marginBottom: "10px" }}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </button>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2>
      <hr />

      {/* Courses list */}
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => (
            <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to={
                    currentUser.role === "FACULTY" ||
                    enrollments.some(
                      (enrollment: any) =>
                        enrollment.user === currentUser._id && enrollment.course === course._id
                    )
                      ? `/Kanbas/Courses/${course._id}/Home`
                      : "#"
                  }
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img src="/images/reactjs.jpg" width="100%" height={160} alt="" />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <button className="btn btn-primary">Go</button>

                    {/* Faculty-specific controls */}
                    {currentUser.role === "FACULTY" && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}

                    {/* Student enrollment controls */}
                    {currentUser.role === "STUDENT" && (
                      <button
                        className={`btn ${
                          enrollments.some(
                            (enrollment: any) =>
                              enrollment.user === currentUser._id && enrollment.course === course._id
                          )
                            ? "btn-danger"
                            : "btn-success"
                        } float-end`}
                        onClick={(event) => {
                          event.preventDefault();
                          handleEnrollmentChange(course._id);
                        }}
                      >
                        {enrollments.some(
                          (enrollment: any) =>
                            enrollment.user === currentUser._id && enrollment.course === course._id
                        )
                          ? "Unenroll"
                          : "Enroll"}
                      </button>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
