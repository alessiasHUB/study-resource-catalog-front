import { Link } from "react-router-dom";
interface NavBarProps {
  signedInUser: string | undefined;
}
function NavBar(props: NavBarProps): JSX.Element {
  return (
    <div className="ctn-nav">
      <nav className="nav">
        {props.signedInUser !== undefined ? (
          <>
            <Link to="/"> HOME </Link>
            <Link to="/catalog"> CATALOG </Link>
            <Link to="/study_list"> STUDY LIST </Link>
            <p className="signed-in-user">{props.signedInUser}</p>
          </>
        ) : (
          <>
            <Link to="/"> HOME </Link>
            <Link to="/catalog"> CATALOG </Link>
            <Link to="/signIn"> SIGN-IN </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
