import { useState } from "react";
import { IUserData } from "../utils/interfaces";

interface SignInProps {
  userData: IUserData[];
  setSignedInUser: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function SignInPage(props: SignInProps): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    "allithatgalli"
  );
  function handleSignIn() {
    if (selectedUser !== "Select user...") {
      props.setSignedInUser(selectedUser);
    } else {
      alert("You haven't selected a user...");
    }
    console.log("signed in as: ", selectedUser);
  }
  return (
    <>
      <div>
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
