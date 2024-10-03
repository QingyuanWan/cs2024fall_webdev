import { Link } from "react-router-dom";
import "./index.css";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">


            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/reactjs.jpg" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      CS1234 React JS
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                        Full Stack software developer
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>






            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/buger.jpg" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                    CS1001 Make Buger
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                    Full Stack Buger developer
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>


            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/chicken.jpg" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                    CS1002 Cook Chicken
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                    Full Stack Chicken developer
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>


            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/pasta.jpg" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                    CS1003 Cook Pasta
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                    Full Stack Italian Chef
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>


            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/Franchfood.jpg" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                    CS1004 Franch Food
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                    Full Stack Franch Chef
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/hotdog.jpg" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                    CS1005 Cook HD
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                    Full Stack Hot Dog
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/animate.jpg" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                    CS2001 Animate Design
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                    Full Stack Animation developer
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/gamedes.png" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                    CS2002 Animate Game Design
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                    Full Stack Animation Game developer
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/draw.avif" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                    CS2003 Animate Draw
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                    Full Stack Animate Artist
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/truth.jpg" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                    CS2004 Truth of Engagement
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                    Full Stack Engagement
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/cat.jpg" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                    CS2003 Philosophy
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                    Full Stack philosopher
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>



            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/1234/Home">
                  <img src="/images/mgc.jpg" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                    CS6666 Magic
                    </h5>
                    <p className="wd-dashboard-course-title card-text">
                    Full Stack magician
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>




          </div>


      </div>
    </div>
  );
}
