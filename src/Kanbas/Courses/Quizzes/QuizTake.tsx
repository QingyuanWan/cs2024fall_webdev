import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "../client";

interface AttemptAnswer {
  questionId: string;
  answer: string;
}

export default function QuizTake() {
  const { quizId, cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log(`for netify: ${cid}`);//for netify
  const [quiz, setQuiz] = useState<any>(null);
  const [attempt, setAttempt] = useState<any>(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number>(0);
  const [answers, setAnswers] = useState<AttemptAnswer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!quizId || !currentUser) return;
    client.fetchQuizAttempt(quizId).then(data => {
      if (!data || !data.quiz) {
        setLoading(false);
        return;
      }

      setQuiz(data.quiz);
      setAttempt(data.attempt);
      setAttemptsRemaining(data.attemptsRemaining);

      if (data.attempt) {
        setAnswers(data.attempt.answers);
        setSubmitted(true);
      } else {
        if (data.attemptsRemaining > 0) {
          if (data.quiz.questions && data.quiz.questions.length > 0) {
            const blankAnswers = data.quiz.questions.map((q: any) => ({
              questionId: q._id, answer: ""
            }));
            setAnswers(blankAnswers);
            setSubmitted(false);
          } else {
            setSubmitted(true); 
          }
        } else {
          setSubmitted(true);
        }
      }

      setLoading(false);
    });
  }, [quizId, currentUser]);

  const handleAnswerChange = (questionId: string, value: string) => {
    if (submitted) return;
    const updated = [...answers];
    const idx = updated.findIndex(a => a.questionId === questionId);
    if (idx >= 0) {
      updated[idx].answer = value;
    }
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (!quizId) return;
    const result = await client.submitQuizAttempt(quizId, answers);
    const newAttempt = {
      student: currentUser._id,
      answers: result.answers,
      score: result.score,
      attemptDate: result.attemptDate
    };
    setAttempt(newAttempt);
    setSubmitted(true);
  };

  const handleRetake = () => {
    // Check attemptsRemaining again before retaking
    if (attemptsRemaining > 0 && quiz && quiz.questions && quiz.questions.length > 0) {
      const blankAnswers = quiz.questions.map((q: any) => ({
        questionId: q._id, answer: ""
      }));
      setAnswers(blankAnswers);
      setSubmitted(false);
    } else {
      // No attempts left
      alert("No attempts left");
    }
  };

  const isCorrect = (q: any, ans: string) => q.correctAnswers.includes(ans);

  if (loading) {
    return <p>Loading quiz attempt information...</p>;
  }

  if (!quiz) {
    return <p>Unable to load quiz. Please try again later.</p>;
  }

  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <div>
        <h3>{quiz.title}</h3>
        <p>No questions found for this quiz.</p>
      </div>
    );
  }

  const totalPoints = quiz.questions.reduce((acc: number, q: any) => acc + q.points, 0);
  const score = attempt ? attempt.score : null;

  return (
    <div>
      <h3>{quiz.title}</h3>
      {quiz.published ? (
        <p><i>This is a published quiz.</i></p>
      ) : (
        <p><i>This quiz is not published yet. (Preview)</i></p>
      )}

      <h4>Quiz Instructions</h4>
      <p>{quiz.description}</p>

      {quiz.questions.map((q: any, index: number) => {
        const userAnswer = answers.find(a => a.questionId === q._id)?.answer || "";
        const wasSubmitted = submitted;
        let correctClass = "";
        if (wasSubmitted && userAnswer) {
          correctClass = isCorrect(q, userAnswer) ? "text-success fw-bold" : "text-danger fw-bold";
        }

        return (
          <div key={q._id} className="border p-2 mb-3">
            <h5>Question {index + 1} ({q.points} pts)</h5>
            <p>{q.questionText}</p>
            {q.type === "Multiple Choice" && q.options && q.options.map((opt: string, i: number) => (
              <div key={i} className={`form-check ${wasSubmitted && opt === userAnswer ? correctClass : ""}`}>
                <input
                  type="radio"
                  name={`q${q._id}`}
                  className="form-check-input"
                  checked={userAnswer === opt}
                  disabled={wasSubmitted}
                  onChange={() => handleAnswerChange(q._id, opt)}
                />
                <label className="form-check-label">{opt}</label>
              </div>
            ))}

            {q.type === "True/False" && (
              <>
                {["True","False"].map((val) => (
                  <div key={val} className={`form-check ${wasSubmitted && userAnswer === val ? (isCorrect(q, val) ? "text-success fw-bold" : "text-danger fw-bold") : ""}`}>
                    <input
                      type="radio"
                      name={`q${q._id}`}
                      className="form-check-input"
                      checked={userAnswer === val}
                      disabled={wasSubmitted}
                      onChange={() => handleAnswerChange(q._id, val)}
                    />
                    <label className="form-check-label">{val}</label>
                  </div>
                ))}
              </>
            )}

            {q.type === "Fill in the Blank" && (
              <input
                type="text"
                className={`form-control w-50 ${wasSubmitted && userAnswer ? (isCorrect(q, userAnswer) ? "border-success" : "border-danger") : ""}`}
                value={userAnswer}
                disabled={wasSubmitted}
                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
              />
            )}
          </div>
        );
      })}

      {!submitted && attemptsRemaining > 0 && (
        <button className="btn btn-primary" onClick={handleSubmit}>Submit Quiz</button>
      )}

      {submitted && score !== null && (
        <div className="mt-3">
          <h5>Your Score: {score} / {totalPoints}</h5>
          {attemptsRemaining > 0 && (
            <button className="btn btn-secondary mt-3" onClick={handleRetake}>Retake Quiz</button>
          )}
        </div>
      )}
    </div>
  );
}
