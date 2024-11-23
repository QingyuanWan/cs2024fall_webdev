import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEnrollments, enroll, unenroll } from "./reducer";
import * as coursesClient from "../Courses/client";
import * as enrollmentsClient from "./client";

interface Course {
  _id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  const toggleShowAllCourses = async () => {
    if (!showAllCourses) {
      try {
        const fetchedCourses = await coursesClient.findAllCourses();
        setAllCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching all courses:", error);
      }
    }
    setShowAllCourses(!showAllCourses);
  };

  const handleEnrollmentChange = async (courseId: string) => {
    const isEnrolled = enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );

    try {
      if (isEnrolled) {
        await enrollmentsClient.unenrollUserFromCourse(currentUser._id, courseId);
        dispatch(unenroll({ user: currentUser._id, course: courseId }));
      } else {
        await enrollmentsClient.enrollUserInCourse(currentUser._id, courseId);
        dispatch(enroll({ user: currentUser._id, course: courseId }));
      }
    } catch (error) {
      console.error("Error changing enrollment status:", error);
    }
  };

  const displayedCourses = showAllCourses ? allCourses : courses;

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

      <button
        className="btn btn-info float-end"
        onClick={toggleShowAllCourses}
        style={{ marginBottom: "10px" }}
      >
        {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
      </button>

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      {/* Courses list */}
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course: Course) => {
            const isEnrolled = enrollments.some(
              (enrollment: any) =>
                enrollment.user === currentUser._id && enrollment.course === course._id
            );

            return (
              <div
                key={course._id}
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={
                      isEnrolled || currentUser.role === "FACULTY"
                        ? `/Kanbas/Courses/${course._id}/Home`
                        : "#"
                    }
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img
                      src="/images/reactjs.jpg"
                      width="100%"
                      height={160}
                      alt=""
                    />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>

                      {/* Enrollment button */}
                      {showAllCourses && (
                          <>
                            <button
                              className="btn btn-success me-2"
                              onClick={(e) => {
                                e.preventDefault();
                                enrollmentsClient
                                  .enrollUserInCourse(currentUser._id, course._id)
                                  .then(() => {
                                    dispatch(enroll({ user: currentUser._id, course: course._id }));
                                    window.location.reload();
                                  })
                                  .catch((error) => console.error("Error enrolling:", error));
                              }}
                            >
                              Enroll
                            </button>

                            {/* Unenroll button */}
                            <button
                              className="btn btn-danger"
                              onClick={(e) => {
                                e.preventDefault();
                                enrollmentsClient
                                  .unenrollUserFromCourse(currentUser._id, course._id)
                                  .then(() => {
                                    dispatch(unenroll({ user: currentUser._id, course: course._id }));
                                    window.location.reload(); 
                                  })
                                  .catch((error) => console.error("Error unenrolling:", error));
                              }}
                            >
                              Unenroll
                            </button>
                          </>
                        )}























                      {!showAllCourses && (
                      <button
                        className="btn btn-primary me-2"
                        onClick={(e) => e.preventDefault()}
                      >
                        Go
                      </button>
                    )}
                      {/* Faculty only controls */}
                      {currentUser.role === "FACULTY" && !showAllCourses && (
                        <>
                          <button
                            className="btn btn-warning me-2 float-end"
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(course);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger float-end"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteCourse(course._id);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
