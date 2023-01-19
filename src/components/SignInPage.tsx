import { useState } from "react";
import { IUserData } from "../utils/interfaces";

interface SignInProps {
  IUserData: IUserData[];
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
          {props.IUserData.map((IUserData) => {
            return (
              <option key={IUserData.id} value={IUserData.username}>
                {IUserData.username}
              </option>
            );
          })}
        </select>
        <button onClick={handleSignIn}> SIGN IN </button>
      </div>
    </>
  );
}

export default SignInPage;

// onClick={props.setSignedInUser}
