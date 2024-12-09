import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "../client";
import QuizQuestionsEditor from "./QuizQuestionsEditor";

export default function QuizEditor() {
  const { quizId, cid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const isNewQuiz = quizId === "new";

  const [activeTab, setActiveTab] = useState<"details" | "questions">("details");
  const [quiz, setQuiz] = useState<any>({
    title: "New Quiz",
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimitMinutes: 20,
    multipleAttemptsAllowed: false,
    maxAttemptsAllowed: 1,
    showCorrectAnswers: "Never",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    questionsLockAfterAnswering: false,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    questions: [],
    published: false
  });

  useEffect(() => {
    if (!isNewQuiz && quizId) {
      client.findQuizById(quizId).then((data) => {
        let updated = { ...data };
        if (!updated.multipleAttemptsAllowed) {
          updated.maxAttemptsAllowed = 1;
        }
        setQuiz(updated);
      });
    }
  }, [quizId, isNewQuiz]);

  const totalPoints = (quiz.questions || []).reduce((acc: number, q: any) => acc + (q.points || 0), 0);

  const handleSave = async () => {
    const toSave = { ...quiz };
    if (!toSave.multipleAttemptsAllowed) {
      toSave.maxAttemptsAllowed = 1;
    }
  
    const totalPoints = (toSave.questions || []).reduce((acc: number, q: any) => acc + (q.points || 0), 0);
    toSave.points = totalPoints;
  
    if (isNewQuiz && cid) {
      const newQuiz = await client.createQuizForCourse(cid, toSave);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}/details`);
    } else {
      await client.updateQuiz({ ...toSave, _id: quizId });
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/details`);
    }
  };

  const handleSaveAndPublish = async () => {
    const toSave = { ...quiz, published: true };
    if (!toSave.multipleAttemptsAllowed) {
      toSave.maxAttemptsAllowed = 1;
    }
  
    // total point update quiz.points
    const totalPoints = (toSave.questions || []).reduce((acc: number, q: any) => acc + (q.points || 0), 0);
    toSave.points = totalPoints;
  
    if (isNewQuiz && cid) {
      await client.createQuizForCourse(cid, toSave);
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } else {
      await client.updateQuiz({ ...toSave, _id: quizId });
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    }
  };
  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleQuestionsSave = async () => {
    await client.updateQuiz({ ...quiz, _id: quizId });
  };

  const handleQuestionsCancel = async () => {
    if (!isNewQuiz && quizId) {
      const data = await client.findQuizById(quizId);
      setQuiz(data);
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3>{isNewQuiz ? "Create Quiz" : "Edit Quiz"}</h3>
        <div className="text-muted">
          Points {totalPoints} {quiz.published ? "✅ Published" : "Not Published"}
        </div>
      </div>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>

      {activeTab === "details" && (
        <div>
          <label className="fw-bold">Title</label>
          <input
            type="text"
            className="form-control mb-3"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            placeholder="Enter quiz title"
          />

          <label className="fw-bold">Description (WYSIWYG)</label>
          <textarea
            className="form-control mb-3"
            rows={4}
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            placeholder="Enter quiz instructions or description"
          ></textarea>

          <div className="row mb-3">
            <div className="col-6 mb-3">
              <label className="fw-bold">Quiz Type</label>
              <select
                className="form-select"
                value={quiz.quizType}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
              >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </select>
            </div>
            <div className="col-6 mb-3">
              <label className="fw-bold">Assignment Group</label>
              <select
                className="form-select"
                value={quiz.assignmentGroup}
                onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
              >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </select>
            </div>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={quiz.shuffleAnswers}
              onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
            />
            <label className="form-check-label">Shuffle Answers (Yes/No)</label>
          </div>

          <div className="mb-3">
            <label className="fw-bold">Time Limit (minutes)</label>
            <input
              type="number"
              className="form-control"
              value={quiz.timeLimitMinutes}
              onChange={(e) => setQuiz({ ...quiz, timeLimitMinutes: parseInt(e.target.value) })}
            />
          </div>

          <div className="mb-3">
            <label className="fw-bold">Multiple Attempts</label>
            <select
              className="form-select"
              value={quiz.multipleAttemptsAllowed ? "Yes" : "No"}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  multipleAttemptsAllowed: e.target.value === "Yes"
                })
              }
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          {quiz.multipleAttemptsAllowed && (
            <div className="mb-3">
              <label className="fw-bold">How Many Attempts</label>
              <input
                type="number"
                className="form-control"
                value={quiz.maxAttemptsAllowed}
                onChange={(e) =>
                  setQuiz({ ...quiz, maxAttemptsAllowed: parseInt(e.target.value) })
                }
              />
            </div>
          )}

          <div className="mb-3">
            <label className="fw-bold">Show Correct Answers</label>
            <input
              type="text"
              className="form-control"
              value={quiz.showCorrectAnswers}
              onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}
              placeholder="When/how correct answers are shown"
            />
          </div>

          <div className="mb-3">
            <label className="fw-bold">Access Code</label>
            <input
              type="text"
              className="form-control"
              value={quiz.accessCode}
              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
              placeholder="Leave blank if no access code required"
            />
          </div>

          <div className="mb-3">
            <label className="fw-bold">One Question at a Time</label>
            <select
              className="form-select"
              value={quiz.oneQuestionAtATime ? "Yes" : "No"}
              onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.value === "Yes" })}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="fw-bold">Webcam Required</label>
            <select
              className="form-select"
              value={quiz.webcamRequired ? "Yes" : "No"}
              onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.value === "Yes" })}
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="fw-bold">Lock Questions After Answering</label>
            <select
              className="form-select"
              value={quiz.questionsLockAfterAnswering ? "Yes" : "No"}
              onChange={(e) => setQuiz({ ...quiz, questionsLockAfterAnswering: e.target.value === "Yes" })}
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          
          <div className="mb-3">
            <label className="fw-bold">Due date</label>
            <input
              type="datetime-local"
              className="form-control"
              value={quiz.dueDate}
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="fw-bold">Available From (Available date)</label>
            <input
              type="datetime-local"
              className="form-control"
              value={quiz.availableFrom}
              onChange={(e) => setQuiz({ ...quiz, availableFrom: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="fw-bold">Available Until (Until date)</label>
            <input
              type="datetime-local"
              className="form-control"
              value={quiz.availableUntil}
              onChange={(e) => setQuiz({ ...quiz, availableUntil: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <button onClick={handleCancel} className="btn btn-secondary me-2">
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary me-2">
              Save
            </button>
            <button onClick={handleSaveAndPublish} className="btn btn-success">
              Save and Publish
            </button>
          </div>
        </div>
      )}

      {activeTab === "questions" && (
        <QuizQuestionsEditor
          quiz={quiz}
          setQuiz={(updated) => setQuiz(updated)}
          onSave={handleQuestionsSave}
          onCancel={handleQuestionsCancel}
          isFaculty={isFaculty}
        />
      )}
    </div>
  );
}
