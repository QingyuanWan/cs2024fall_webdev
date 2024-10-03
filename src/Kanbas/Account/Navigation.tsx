import { Link } from "react-router-dom";
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="/Kanbas/Account/Signin" id="wd-Signin"
        className="list-group-item active border border-0"> Signin </Link>
      <Link to="/Kanbas/Account/Signup" id="wd-Signup"
        className="list-group-item text-danger border border-0"> Signup </Link>
      <Link to="/Kanbas/Account/Profile" id="wd-Profile"
        className="list-group-item text-danger border border-0"> Profile </Link>
    </div>
);}


