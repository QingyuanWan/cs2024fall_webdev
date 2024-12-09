import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

export default function QuizControls({ onAddQuiz }: { onAddQuiz: () => void }) {
  return (
    <div id="wd-quizzes-controls" className="text-nowrap d-flex justify-content-between align-items-center mb-3">
      <div className="input-group" style={{ width: "50%" }}>
        <span className="input-group-text">
          <CiSearch className="position-relative" style={{ bottom: "1px" }} />
        </span>
        <input type="text" className="form-control" placeholder="Search Quiz..." />
      </div>

      <div>
        <button
          id="wd-add-quiz-btn"
          className="btn btn-lg btn-danger"
          onClick={onAddQuiz}
        >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Quiz
        </button>
      </div>
    </div>
  );
}
