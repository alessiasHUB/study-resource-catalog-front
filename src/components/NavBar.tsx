import { Link } from "react-router-dom";
import "./navbar.css";

interface NavBarProps {
  signedInUser: string | undefined;
}

function NavBar(props: NavBarProps): JSX.Element {
  return (
    <nav className="nav">
      {props.signedInUser !== undefined ? (
        <>
          <div className="link-container">
            <Link className="nav-link" to="/">
              HOME
            </Link>
            <Link className="nav-link" to="/catalog">
              CATALOG
            </Link>
            <Link className="nav-link-end" to="/study_list">
              STUDY LIST
            </Link>
          </div>
          <p className="signed-in-user">
            <img
              className="signed-in-icon"
              src="https://cdn2.iconfinder.com/data/icons/man-user-human-person-avatar-business-profile/100/18-1User_1-6-512.png"
              alt="signed in"
            />
            {props.signedInUser}
          </p>
        </>
      ) : (
        <>
          <div className="link-container">
            <Link className="nav-link" to="/">
              HOME
            </Link>
            <Link className="nav-link" to="/catalog">
              CATALOG
            </Link>
            <Link className="nav-link-end-no-user" to="/signIn">
              SIGN-IN
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
