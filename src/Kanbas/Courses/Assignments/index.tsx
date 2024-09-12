export default function Assignments() {
    return (
      <div id="wd-assignments">
        <input id="wd-search-assignment"
               placeholder="Search for Assignments" />
        <button id="wd-add-assignment-group">+ Group</button>
        <button id="wd-add-assignment">+ Assignment</button>
        <h3 id="wd-assignments-title">
          ASSIGNMENTS 40% of Total <button>+</button>
        </h3>
        <ul id="wd-assignment-list">
          <li className="wd-assignment-list-item">
            <a className="wd-assignment-link"
              href="#/Kanbas/Courses/1234/Assignments/123">
              A1 - ENV + HTML
            </a>
            <p id="wd-p-2">
            Mutiple Modules | Not avaviable until ~~ undecided
            </p>
          </li>
          <li className="wd-assignment-list-item">
            <a className="wd-assignment-link"
              href="#/Kanbas/Courses/1234/Assignments/222">
              A2 - CSS + BOOTSTRAP
            </a>
            <p id="wd-p-2">
            Mutiple Modules | Not avaviable until ~~ undecided
            </p>
          </li>
          <li className="wd-assignment-list-item">
            <a className="wd-assignment-link"
              href="#/Kanbas/Courses/1234/Assignments/333">
              A1 - JAVASCRIPT + REACT
            </a>
            <p id="wd-p-2">
            Mutiple Modules | Not avaviable until ~~ undecided
            </p>
          </li>
        </ul>
      </div>
  );}
  