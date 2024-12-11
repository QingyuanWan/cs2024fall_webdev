import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "../client";

export default function QuizPreview() {
  const { quizId, cid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [quiz, setQuiz] = useState<any>(null);
  //console.log(`for netify: ${currentUser}`);//for netify

  useEffect(() => {
    if (!quizId) return;
    client.findQuizById(quizId).then((data) => {
      setQuiz(data);
    });
  }, [quizId]);

  if (!quiz) return <p>Loading...</p>;

  const handleEditQuiz = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit?tab=questions`);
  };

  return (
    <div>
      <h3>{quiz.title}</h3>
      {quiz.published ? (
        <p><i>This is a preview of the published version of the quiz.</i></p>
      ) : (
        <p><i>This quiz is not published yet. Previewing draft version.</i></p>
      )}

      <h4>Quiz Instructions</h4>
      <p>{quiz.description}</p>

      {quiz.questions && quiz.questions.length > 0 ? (
        quiz.questions.map((q: any, index: number) => (
          <div key={q._id || index} className="border p-2 mb-3">
            <h5>Question {index + 1} ({q.points} pts)</h5>
            <p>{q.questionText}</p>
            {q.type === "Multiple Choice" && q.options && (
              <ul>
                {q.options.map((opt: string, i: number) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            )}
            {q.type === "True/False" && (
              <ul>
                <li>True</li>
                <li>False</li>
              </ul>
            )}
            {q.type === "Fill in the Blank" && (
              <p><i>Student would type their answer in a textbox here.</i></p>
            )}
          </div>
        ))
      ) : (
        <p>No questions yet.</p>
      )}

      <button className="btn btn-secondary mt-3" onClick={handleEditQuiz}>
        Keep Editing This Quiz
      </button>
    </div>
  );
}
