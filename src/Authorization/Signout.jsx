import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Index";
import "./Signout.css";

const Signout = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    if (auth.currentUser) {
      try {
        await signOut(auth);
        console.log("User is signed out");
        navigate("/");
      } catch (error) {
        console.error(error.code);
      }
    } else {
      console.log("No use Signed in");
    }
  };

  const browsingHandler = () => {
    navigate("/");
  };
  return (
    <>
      <main className="signout">
        <h1>Signout</h1>
        <div className="signout_main">
          <p>Are you sure ?</p>
          <div className="signout_buttons">
            <button onClick={logoutHandler}>Yes</button>
            <button onClick={browsingHandler}>No</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signout;
