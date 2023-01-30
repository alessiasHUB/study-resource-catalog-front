import { useState } from "react";
import { IUserData } from "../utils/interfaces";
import "./navbar.css";
interface SignInProps {
  userData: IUserData[];
  setSignedInUser: React.Dispatch<React.SetStateAction<IUserData | undefined>>;
}

function SignInPage(props: SignInProps): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    "allithatgalli"
  );
  function handleSignIn() {
    if (selectedUser !== "Select user..." && selectedUser !== undefined) {
      props.setSignedInUser(getUserFromUsername(selectedUser, props.userData));
    } else {
      alert("You haven't selected a user...");
    }
    console.log("signed in as: ", selectedUser);
  }

  function getUserFromUsername(
    username: string,
    userDataArr: IUserData[]
  ): IUserData {
    const filteredArr = userDataArr.filter(
      (user) => user.username === username
    );
    return filteredArr[0];
  }

  return (
    <>
      <div className="sign-in-page">
        <> Sign-In Page </>
        <select onChange={(e) => setSelectedUser(e.target.value)}>
          {props.userData.map((userData) => {
            return (
              <option key={userData.id} value={userData.username}>
                {userData.username}
              </option>
            );
          })}
        </select>
        <button className="sign-in-btn" onClick={handleSignIn}>
          {" "}
          SIGN IN{" "}
        </button>
      </div>
    </>
  );
}

export default SignInPage;

// onClick={props.setSignedInUser}
