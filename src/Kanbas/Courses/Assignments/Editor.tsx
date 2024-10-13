import { useParams } from "react-router";
import { assignments } from "../../Database";
export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = assignments.find((assignment) => assignment._id === aid && assignment.course === cid);

    return (
      <div id="wd-assignments-editor">

        
        <div id="wd-css-responsive-forms-2">
      <h6>Assigment Name</h6>
      <form>
        <div className="row mb-3">

        <div className="col-sm-12">
          <input type="text" className="form-control" id="as1" value={assignment?.title} />
        </div> 
      </div>


      <div className="mb-3 row">
      <div className="col-sm-12">
        <textarea 
          id="textarea2" 
          className="form-control"
          rows={8}
          value="The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page."
        ></textarea>
      </div>
    </div>
      
  </form>
  <form>
    <div className="row mb-3">
      <div className="col-sm-2 text-end">
        <label htmlFor="wd-points" className="col-form-label">Points</label>
      </div>
      <div className="col-md-10">
        <input type="number" id="wd-points" value={100} className="form-control" />
      </div>
    </div>



    <div className="row mb-3">
      <div className="col-sm-2 text-end">
        <label htmlFor="wd-group" className="col-form-label">Assignment Group</label>
      </div>
      <div className="col-md-10">
        <select id="wd-group" className="form-select">
          <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
          <option value="QUIZZES">QUIZZES</option>
          <option value="EXAMS">EXAMS</option>
          <option value="PROJECT">PROJECT</option>
        </select>
      </div>
    </div>







    <div className="row mb-3">
      <div className="col-sm-2 text-end">
        <label htmlFor="wd-submission-type" className="col-form-label">Submission Type</label>
      </div>
      <div className="col-md-10">
        <select id="wd-submission-type" className="form-select">
          <option selected value="Online">Online</option>
          <option value="Paper">Paper</option>
        </select>

        <div className="mt-3">
          <label className="form-label fw-bold">Online Entry Options:</label>
          <div className="form-check">
            <input type="checkbox" id="wd-text-entry" className="form-check-input" />
            <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-website-url" className="form-check-input" />
            <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
            <label htmlFor="wd-media-recordings" className="form-check-label">Media Recording</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
            <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-file-upload" className="form-check-input" />
            <label htmlFor="wd-file-upload" className="form-check-label">File Upload</label>
          </div>
        </div>
      </div>
    </div>

    




    
    <div className="row mb-3">
      <div className="col-sm-2 text-end">
        <label htmlFor="wd-assign-to" className="col-form-label">Assign</label>
      </div>
      <div className="col-md-10">
        <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
        <input id="wd-assign-to" className="form-control mb-3" value="Everyone" readOnly />

        <label htmlFor="wd-due-date" className="form-label">Due</label>
        <input 
          type="datetime-local"
          id="wd-due-date"
          className="form-control mb-3"
          defaultValue="2024-09-20T23:59"
        />

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="wd-available-from" className="form-label">Available from</label>
            <input 
              type="datetime-local"
              id="wd-available-from"
              className="form-control"
              defaultValue="2024-08-21T12:00"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="wd-available-until" className="form-label">Until</label>
            <input 
              type="datetime-local"
              id="wd-available-until"
              className="form-control"
              defaultValue="2024-10-01T23:59"
            />
          </div>
        </div>
      </div>
    </div>


    <div className="d-flex justify-content-end mt-3">
      <button type="button" className="btn btn-secondary me-2">Cancel</button>
      <button type="submit" className="btn btn-primary">Save</button>
    </div>



    </form>


</div>






          
</div>

      
      
  );}
  