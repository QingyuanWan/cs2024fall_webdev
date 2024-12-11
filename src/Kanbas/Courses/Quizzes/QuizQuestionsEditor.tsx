import React, { useState } from "react";

interface Question {
  _id?: string;
  title: string;
  type: "Multiple Choice" | "True/False" | "Fill in the Blank";
  points: number;
  questionText: string;
  options?: string[];
  correctAnswers?: string[];
}

interface QuizQuestionsEditorProps {
  quiz: any; 
  setQuiz: (updatedQuiz: any) => void;
  onSave: () => void; 
  onCancel: () => void; 
  isFaculty: boolean;
}

const defaultQuestion: Question = {
  title: "New Question",
  type: "Multiple Choice",
  points: 1,
  questionText: "",
  options: ["Option 1", "Option 2"],
  correctAnswers: ["Option 1"]
};

export default function QuizQuestionsEditor({ quiz, setQuiz, onSave, onCancel, isFaculty }: QuizQuestionsEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const questions: Question[] = quiz.questions || [];

  const totalPoints = questions.reduce((acc, q) => acc + (q.points || 0), 0);

  const handleNewQuestion = () => {
    const newQ = { ...defaultQuestion };
    setQuiz({ ...quiz, questions: [...questions, newQ] });
    setEditingIndex(questions.length);
    setEditingQuestion({ ...newQ });
  };

  const handleEditQuestion = (index: number) => {
    if (!isFaculty) return;
    setEditingIndex(index);
    setEditingQuestion({ ...questions[index] });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingQuestion(null);
  };

  const handleUpdateQuestion = () => {
    if (editingIndex === null || !editingQuestion) return;
    const updatedQuestions = [...questions];
    updatedQuestions[editingIndex] = editingQuestion;
    setQuiz({ ...quiz, questions: updatedQuestions });
    handleCancelEdit();
  };

  const handleQuestionTypeChange = (type: "Multiple Choice" | "True/False" | "Fill in the Blank") => {
    if (!editingQuestion) return;
    let updated = { ...editingQuestion, type };
    if (type === "Multiple Choice") {
      updated.options = updated.options || ["Option 1", "Option 2"];
      updated.correctAnswers = updated.correctAnswers?.length ? updated.correctAnswers : ["Option 1"];
    } else if (type === "True/False") {
      updated.options = undefined;
      updated.correctAnswers = ["True"];
    } else if (type === "Fill in the Blank") {
      updated.options = undefined;
      updated.correctAnswers = ["Correct Answer"];
    }
    setEditingQuestion(updated);
  };

  const renderMultipleChoiceEditor = () => {
    if (!editingQuestion) return null;
    const { title, points, questionText, options = [], correctAnswers = [] } = editingQuestion;

    const handleOptionChange = (optIndex: number, value: string) => {
      const updatedOptions = [...options];
      updatedOptions[optIndex] = value;
      setEditingQuestion({ ...editingQuestion, options: updatedOptions });
    };

    const handleAddOption = () => {
      setEditingQuestion({ ...editingQuestion, options: [...options, "New Option"] });
    };

    const handleRemoveOption = (optIndex: number) => {
      const updatedOptions = [...options];
      updatedOptions.splice(optIndex, 1);
      let updatedCorrect = correctAnswers;
      if (updatedCorrect && updatedCorrect.includes(options[optIndex])) {
        if (updatedOptions.length > 0) {
          updatedCorrect = [updatedOptions[0]];
        } else {
          updatedCorrect = [];
        }
      }
      setEditingQuestion({ ...editingQuestion, options: updatedOptions, correctAnswers: updatedCorrect });
    };

    const handleCorrectChange = (correctValue: string) => {
      setEditingQuestion({ ...editingQuestion, correctAnswers: [correctValue] });
    };

    return (
      <div>
        <label>Title</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })} />

        <label>Points</label>
        <input type="number" className="form-control" value={points} onChange={(e) => setEditingQuestion({ ...editingQuestion, points: parseInt(e.target.value) })} />

        <label>Question</label>
        <textarea className="form-control" rows={4} value={questionText} onChange={(e) => setEditingQuestion({ ...editingQuestion, questionText: e.target.value })} />

        <h6>Answers:</h6>
        {options.map((opt, i) => (
          <div key={i} className="d-flex align-items-center mb-2">
            <input type="radio" name="correctAnswer" className="me-2" checked={correctAnswers[0] === opt} onChange={() => handleCorrectChange(opt)} />
            <input type="text" className="form-control me-2" value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} />
            {options.length > 2 && <button className="btn btn-danger btn-sm" onClick={() => handleRemoveOption(i)}>Remove</button>}
          </div>
        ))}
        <button className="btn btn-secondary btn-sm mt-2" onClick={handleAddOption}>+ Add Another Answer</button>

        <div className="mt-3">
          <button className="btn btn-secondary me-2" onClick={handleCancelEdit}>Cancel</button>
          <button className="btn btn-primary" onClick={handleUpdateQuestion}>Update Question</button>
        </div>
      </div>
    );
  };

  const renderTrueFalseEditor = () => {
    if (!editingQuestion) return null;
    const { title, points, questionText, correctAnswers = ["True"] } = editingQuestion;

    return (
      <div>
        <label>Title</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })} />

        <label>Points</label>
        <input type="number" className="form-control" value={points} onChange={(e) => setEditingQuestion({ ...editingQuestion, points: parseInt(e.target.value) })} />

        <label>Question</label>
        <textarea className="form-control" rows={4} value={questionText} onChange={(e) => setEditingQuestion({ ...editingQuestion, questionText: e.target.value })} />

        <h6>Answers:</h6>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="tfCorrect" checked={correctAnswers[0] === "True"} onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswers: ["True"] })} />
          <label className="form-check-label">True</label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="tfCorrect" checked={correctAnswers[0] === "False"} onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswers: ["False"] })} />
          <label className="form-check-label">False</label>
        </div>

        <div className="mt-3">
          <button className="btn btn-secondary me-2" onClick={handleCancelEdit}>Cancel</button>
          <button className="btn btn-primary" onClick={handleUpdateQuestion}>Update Question</button>
        </div>
      </div>
    );
  };

  const renderFillInBlankEditor = () => {
    if (!editingQuestion) return null;
    const { title, points, questionText, correctAnswers = [""] } = editingQuestion;

    const handleAnswerChange = (index: number, value: string) => {
      const updated = [...correctAnswers];
      updated[index] = value;
      setEditingQuestion({ ...editingQuestion, correctAnswers: updated });
    };

    const handleAddAnswer = () => {
      setEditingQuestion({ ...editingQuestion, correctAnswers: [...correctAnswers, ""] });
    };

    const handleRemoveAnswer = (index: number) => {
      const updated = [...correctAnswers];
      updated.splice(index, 1);
      setEditingQuestion({ ...editingQuestion, correctAnswers: updated });
    };

    return (
      <div>
        <label>Title</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })} />

        <label>Points</label>
        <input type="number" className="form-control" value={points} onChange={(e) => setEditingQuestion({ ...editingQuestion, points: parseInt(e.target.value) })} />

        <label>Question</label>
        <textarea className="form-control" rows={4} value={questionText} onChange={(e) => setEditingQuestion({ ...editingQuestion, questionText: e.target.value })} />

        <h6>Possible Correct Answers:</h6>
        {correctAnswers.map((ans, i) => (
          <div key={i} className="d-flex align-items-center mb-2">
            <input type="text" className="form-control me-2" value={ans} onChange={(e) => handleAnswerChange(i, e.target.value)} />
            {correctAnswers.length > 1 && <button className="btn btn-danger btn-sm" onClick={() => handleRemoveAnswer(i)}>Remove</button>}
          </div>
        ))}
        <button className="btn btn-secondary btn-sm mt-2" onClick={handleAddAnswer}>+ Add Another Answer</button>

        <div className="mt-3">
          <button className="btn btn-secondary me-2" onClick={handleCancelEdit}>Cancel</button>
          <button className="btn btn-primary" onClick={handleUpdateQuestion}>Update Question</button>
        </div>
      </div>
    );
  };

  const renderEditor = () => {
    if (!editingQuestion) return null;

    return (
      <div className="mt-3 border p-3">
        <div className="d-flex mb-3 align-items-center">
          <label className="me-2">Question Type:</label>
          <select className="form-select w-auto" value={editingQuestion.type} onChange={(e) => handleQuestionTypeChange(e.target.value as any)}>
            <option>Multiple Choice</option>
            <option>True/False</option>
            <option>Fill in the Blank</option>
          </select>
        </div>
        {editingQuestion.type === "Multiple Choice" && renderMultipleChoiceEditor()}
        {editingQuestion.type === "True/False" && renderTrueFalseEditor()}
        {editingQuestion.type === "Fill in the Blank" && renderFillInBlankEditor()}
      </div>
    );
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Points {totalPoints}</h5>
        {isFaculty && <button className="btn btn-secondary" onClick={handleNewQuestion}>+ New Question</button>}
      </div>

      {questions.length === 0 && <p>No questions yet. Click "+ New Question" to add.</p>}

      {questions.map((q, i) => (
        <div key={i} className="mb-3 border p-2 rounded">
          {editingIndex === i ? (
            renderEditor()
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{q.title}</strong> ({q.type}) - {q.points} pts
              </div>
              {isFaculty && (
                <button className="btn btn-link" onClick={() => handleEditQuestion(i)}>
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {editingIndex === null && (
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave}>Save</button>
        </div>
      )}
    </div>
  );
}
