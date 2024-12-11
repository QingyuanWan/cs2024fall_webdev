import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "../client";
import { useSelector } from "react-redux";

export default function QuizDetails() {
  const { quizId, cid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [attemptInfo, setAttemptInfo] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    if (!quizId) return;
    client.findQuizById(quizId).then((data) => setQuiz(data));
  }, [quizId]);

  useEffect(() => {
    if (!quizId || !currentUser) return;
    if (currentUser.role === "STUDENT") {
      client.fetchQuizAttempt(quizId).then((data) => setAttemptInfo(data));
    }
  }, [quizId, currentUser]);

  if (!quiz) return <p>Loading...</p>;

  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  let attemptsRemaining = 0;
  let lastAttempt = null;
  if (isStudent && attemptInfo) {
    attemptsRemaining = attemptInfo.attemptsRemaining; 
    lastAttempt = attemptInfo.attempt;
  }

  const attemptsAllowed = quiz.multipleAttemptsAllowed ? (quiz.maxAttemptsAllowed ?? 1) : 1;

  const handleStartQuiz = () => {
    if (!isStudent) return;

    if (!quiz.published) {
      alert("Quiz published yet");
      return;
    }

    const now = new Date();
    const from = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const until = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

    if (from && now < from) {
      alert("Quiz not yet open to be available");
      return;
    }
    if (until && now > until) {
      alert("Quiz passed available subbmit time");
      return;
    }

    if (quiz.accessCode && quiz.accessCode.trim() !== "") {
      const code = prompt("Enter Access Code:");
      if (code === null || code.trim() === "") {
        alert("No access code entered, cannot start quiz.");
        return;
      }
      if (code.trim() !== quiz.accessCode.trim()) {
        alert("Incorrect access code");
        return;
      }
    }

    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/take`);
  };

  return (
    <div>
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>

      <ul>
        <li><strong>Quiz Type:</strong> {quiz.quizType ?? "Graded Quiz"}</li>
        <li><strong>Points:</strong> {quiz.points ?? 0}</li>
        <li><strong>Assignment Group:</strong> {quiz.assignmentGroup ?? "Quizzes"}</li>
        <li><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}</li>
        <li><strong>Time Limit:</strong> {quiz.timeLimitMinutes ?? 20} Minutes</li>
        <li><strong>Multiple Attempts:</strong> {quiz.multipleAttemptsAllowed ? `Yes (${quiz.maxAttemptsAllowed ?? 1})` : "No"}</li>
        <li><strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers ?? "Never"}</li>
        <li><strong>Access Code:</strong> {quiz.accessCode || "None"}</li>
        <li><strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? "Yes" : "No"}</li>
        <li><strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}</li>
        <li><strong>Lock Questions After Answering:</strong> {quiz.questionsLockAfterAnswering ? "Yes" : "No"}</li>
        <li><strong>Due date:</strong> {quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "None"}</li>
        <li><strong>Available date:</strong> {quiz.availableFrom ? new Date(quiz.availableFrom).toLocaleString() : "None"}</li>
        <li><strong>Until date:</strong> {quiz.availableUntil ? new Date(quiz.availableUntil).toLocaleString() : "None"}</li>

        {isStudent && attemptInfo && (
          <>
            <li><strong>Attempts Allowed:</strong> {attemptsAllowed}</li>
            <li><strong>Attempts Remaining:</strong> {attemptsRemaining}</li>
          </>
        )}
      </ul>

      <div className="mt-3">
        {isFaculty && (
          <>
            <button
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/preview/${quiz._id}`)}
              className="btn btn-secondary me-2"
            >
              Preview
            </button>
            <button
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`)}
              className="btn btn-primary me-2"
            >
              Edit Quiz
            </button>
          </>
        )}

        {isStudent && attemptInfo && (
          <>
            {attemptsRemaining > 0 && (
              <button
                className="btn btn-success"
                onClick={handleStartQuiz}
              >
                Start Quiz
              </button>
            )}

            {attemptsRemaining === 0 && lastAttempt && (
              <div className="mt-3">
                <p>You have used all your attempts for this quiz.</p>
                <p>Your last score: {lastAttempt.score} out of {quiz.questions.reduce((acc: number, q: any) => acc + q.points, 0)}</p>
              </div>
            )}

            {attemptsRemaining === 0 && !lastAttempt && (
              <p>No attempts remain and no attempt recorded.</p>
            )}
          </>
        )}

        {isStudent && !attemptInfo && (
          <p>Loading attempt info...</p>
        )}

        {!isFaculty && !isStudent && (
          <p>You do not have permission to edit or start the quiz.</p>
        )}
      </div>
    </div>
  );
}
