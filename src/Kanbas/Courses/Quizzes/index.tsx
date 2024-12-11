import React, { useState, useEffect, useCallback } from "react";
import * as client from "../client";
import { useParams, useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import QuizControls from "./QuizControls";
import { useSelector } from "react-redux";

interface Quiz {
  _id: string;
  title?: string;
  published?: boolean;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
  points?: number;
  questions?: any[];
  attempts?: any[];
}

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { cid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuizzes = useCallback(async () => {
    if (!cid) return;
    const data = await client.findQuizzesForCourse(cid);
    setQuizzes(data);
  }, [cid]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const handleAddQuiz = async () => {
    if (!cid) return;
    const newQuiz = await client.createQuizForCourse(cid, { title: "New Quiz" });
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}/edit`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    setQuizzes(quizzes.filter((q) => q._id !== quizId));
  };

  const handleTogglePublish = async (quiz: Quiz) => {
    const updated = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updated);
    setQuizzes(quizzes.map((q) => (q._id === quiz._id ? updated : q)));
  };

  const getAvailability = (quiz: Quiz) => {
    const now = new Date();
    const from = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const until = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

    if (from && now < from) {
      return `Not available until ${from.toLocaleString()}`;
    } else if (until && now > until) {
      return "Closed";
    } else if (from && until && now >= from && now <= until) {
      return "Available";
    } else {
      return "Available";
    }
  };

  const isStudent = currentUser?.role === "STUDENT";
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div>
      <h3>Quizzes</h3>

      {isFaculty && (
        <QuizControls onAddQuiz={handleAddQuiz} />
      )}

      {quizzes.length === 0 ? (
        <p>No quizzes yet. {isFaculty && `Click "+ Add Quiz" to create one.`}</p>
      ) : (
        <ul className="list-unstyled mt-4">
          {quizzes.map((quiz) => (
            <li
              key={quiz._id}
              className="mb-3 border p-2 rounded d-flex justify-content-between align-items-center"
            >
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <span
                    style={{ marginRight: "10px", cursor: isFaculty ? "pointer" : "default" }}
                    onClick={() => {
                      if (isFaculty) handleTogglePublish(quiz);
                    }}
                  >
                    {quiz.published ? "✅" : "🚫"}
                  </span>
                  <span
                    style={{ fontSize: "1.1rem", fontWeight: "bold", textDecoration: "none", cursor: "pointer" }}
                    onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`)}
                  >
                    {quiz.title || "Untitled Quiz"}
                  </span>
                </div>
                <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                  {getAvailability(quiz)} | Due: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "No due date"} | Points: {quiz.points ?? 0} | Questions: {quiz.questions?.length ?? 0}
                  {isStudent && quiz.attempts && quiz.attempts.length > 0 && (
                    <> | Score (last attempt): {quiz.attempts[quiz.attempts.length - 1].score}</>
                  )}
                </div>
              </div>
              {isFaculty && (
                <div className="dropdown">
                  <button
                    className="btn btn-light"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ border: "1px solid #ccc" }}
                  >
                    <FaEllipsisV />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`)}
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => handleDeleteQuiz(quiz._id)}>
                        Delete
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => handleTogglePublish(quiz)}>
                        {quiz.published ? "Unpublish" : "Publish"}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
