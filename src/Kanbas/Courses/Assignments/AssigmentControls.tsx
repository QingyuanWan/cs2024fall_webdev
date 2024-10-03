import { FaPlus } from "react-icons/fa6";

import { CiSearch } from "react-icons/ci";

export default function AssigmentControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap d-flex justify-content-between align-items-center mb-3">
      <div className="input-group" style={{ width: '50%' }}>
        <span className="input-group-text">
          <CiSearch className="position-relative" style={{ bottom: "1px" }} />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
        />
      </div>

      <div>
        <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-2">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment
        </button>
        <button id="wd-add-group-btn" className="btn btn-lg btn-secondary">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group
        </button>
      </div>
    </div>
);}
