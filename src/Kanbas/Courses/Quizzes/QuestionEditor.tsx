import React, { useState } from "react";

export default function FillInTheBlankEditor({ onSave, onCancel }: any) {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState(1);
  const [questionText, setQuestionText] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([""]);

  const handleAddAnswer = () => setCorrectAnswers([...correctAnswers, ""]);
  const handleRemoveAnswer = (index: number) =>
    setCorrectAnswers(correctAnswers.filter((_, i) => i !== index));

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...correctAnswers];
    updatedAnswers[index] = value;
    setCorrectAnswers(updatedAnswers);
  };

  const handleSave = () => {
    // this goes partent
    onSave({
      title,
      points,
      questionText,
      correctAnswers,
      type: "Fill in the Blank",
    });
  };

  return (
    <div className="container mt-3">
      <h3 className="mb-4">Fill in the Blank Question Editor</h3>

      <div className="mb-3">
        <label className="fw-bold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          placeholder="Enter question title"
        />
      </div>

      <div className="mb-3">
        <label className="fw-bold">Points</label>
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value))}
          className="form-control"
          placeholder="Enter point value for this question"
        />
      </div>

      <div className="mb-3">
        <label className="fw-bold">Question (WYSIWYG)</label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="form-control"
          rows={4}
          placeholder="Enter the question text here. For example: 'How much is 2+2 = ______?'"
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="fw-bold">Possible Correct Answers</label>
        <p className="text-muted" style={{ fontSize: "0.9rem" }}>
          Enter all possible correct answers. Students will be marked correct if their answer matches one of these. You can add or remove answers as needed.
        </p>
        {correctAnswers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="form-control me-2"
              placeholder={`Possible Answer ${index + 1}`}
            />
            <button onClick={() => handleRemoveAnswer(index)} className="btn btn-danger btn-sm">
              Remove
            </button>
          </div>
        ))}
        <button onClick={handleAddAnswer} className="btn btn-secondary mt-2">
          + Add Another Answer
        </button>
      </div>

      <div className="mt-4">
        <button onClick={onCancel} className="btn btn-secondary me-2">
          Cancel
        </button>
        <button onClick={handleSave} className="btn btn-primary">
          Save/Update Question
        </button>
      </div>
    </div>
  );
}
