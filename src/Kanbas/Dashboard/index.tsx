import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/buger.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1001/Home">
              CS1001 Make Buger
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack Buger developer
            </p>
            <Link to="/Kanbas/Courses/1001/Home"> Go </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/chicken.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1002/Home">
              CS1002 Cook Chicken
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack Chicken developer
            </p>
            <Link to="/Kanbas/Courses/1002/Home"> Go </Link>
          </div>
        </div>
        
        <div className="wd-dashboard-course">
          <img src="/images/pasta.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1003/Home">
              CS1003 Cook Pasta
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack Italian Chef
            </p>
            <Link to="/Kanbas/Courses/1003/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/Franchfood.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1004/Home">
              CS1004 Franch Food
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack Franch Chef
            </p>
            <Link to="/Kanbas/Courses/1004/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/hotdog.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1005/Home">
              CS1005 Cook HD
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack Hot Dog
            </p>
            <Link to="/Kanbas/Courses/1005/Home"> Go </Link>
          </div>
        </div>


        <div className="wd-dashboard-course">
          <img src="/images/animate.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/2001/Home">
              CS2001 Animate Design
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack Animation developer
            </p>
            <Link to="/Kanbas/Courses/2001/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/gamedes.png" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/2002/Home">
              CS2002 Animate Game Design
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack Animation Game developer
            </p>
            <Link to="/Kanbas/Courses/2002/Home"> Go </Link>
          </div>
        </div>


        <div className="wd-dashboard-course">
          <img src="/images/draw.avif" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/2003/Home">
              CS2003 Animate Draw
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack Animate Artist
            </p>
            <Link to="/Kanbas/Courses/2003/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/truth.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/2004/Home">
              CS2004 Truth of Engagement
            </Link>
            <p className="wd-dashboard-course-title">
            Full Stack Engagement
            </p>
            <Link to="/Kanbas/Courses/2004/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/cat.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/2005/Home">
              CS2003 Philosophy
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack philosopher
            </p>
            <Link to="/Kanbas/Courses/2005/Home"> Go </Link>
          </div>
        </div>


      </div>
    </div>
  );
}
