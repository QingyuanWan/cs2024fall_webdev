export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label><br />
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          

          <tr>
          <td align="right" valign="top">
          <label htmlFor="wd-group"> Assigment Group: </label><br/></td>
          <td>
            <select id="wd-group">
            <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">
            EXAMS</option>
            <option value="PROJECT">PROJECT</option>
            </select>
            </td>
        </tr>

        <tr>
          <td align="right" valign="top">
          <label htmlFor="wd-display-grade-as"> Assigment Group: </label><br/></td>
          <td>
            <select id="wd-display-grade-as">
            <option selected value="Percentage">Display Grade as</option>
            <option value="Number">Number</option>
            </select>
            </td>
        </tr>

        <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type: </label><br/>
            </td>
            <td>
                <select id="wd-submission-type">
                <option selected value="Online">Online</option>
                <option value="Paper">Paper</option>
                </select>
                
                <td>
                <label>Online Entry Options:</label><br/>

                <input type="checkbox" name="check-genre" id="wd-text-entry"/>
                <label htmlFor="wd-text-entry">Text Entry</label><br/>

                <input type="checkbox" name="check-genre" id="wd-website-url"/>
                <label htmlFor="wd-website-url">Website URL</label><br/>

                <input type="checkbox" name="check-genre" id="wd-media-recordings"/>
                <label htmlFor="wd-media-recordings">Media Recording</label><br/>

                <input type="checkbox" name="check-genre" id="wd-student-annotation"/>
                <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                <input type="checkbox" name="check-genre" id="wd-file-upload"/>
                <label htmlFor="wd-file-upload">File Upload</label><br/>

                </td>


            </td>
            
            
        </tr>
        <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>

                

            <label htmlFor="wd-assign-to">Assign to</label><br/>
            <input id="wd-assign-to" value={"Everyone"} />


            <br/>
            <label htmlFor="wd-due-date"> Due </label><br/>
                <input type="date"
                    id="wd-due-date"
                    value="2024-09-20"/><br/>



            <td>
            <label htmlFor="wd-available-from"> Available from </label>
            <br/>
                <input type="date"
                    id="wd-available-from"
                    value="2024-08-21"/><br/>
            </td>

            <td>
            <label htmlFor="wd-available-until"> Until </label>
            <br/>
                <input type="date"
                    id="wd-available-until"
                    value="2024-09-28"/><br/>
            </td>



            

            </td>
          </tr>



        

        </table>
        <hr />
        <table width="100%">
        <tr>
            <td align="right">
            <button>Cancel</button>
            <button>Save</button>
            </td>
        </tr>
        </table>

        



          
      </div>

      
      
  );}
  