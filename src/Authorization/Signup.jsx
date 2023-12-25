import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [displayError, setDisplayError] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      navigate("/");

      console.log(user);
    } catch (error) {
      console.error(error.code);
      setError(error.code);
    }
  };

  useEffect(() => {
    if (error === "auth/invalid-login-credentials") {
      setDisplayError("Invalid login credentials");
    } else if (error === "auth/invalid-email") {
      setDisplayError("Invalid Email");
    } else if (error === "auth/missing-password") {
      setDisplayError("Password is required ");
    } else if (error === "auth/weak-password") {
      setDisplayError("Weak password");
    }
  }, [error]);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  return (
    <>
      <main className="signup">
        <h1>Signup</h1>
        {error !== null ? (
          <p className="login_error">{displayError}</p>
        ) : undefined}
        <form onSubmit={submitHandler}>
          <span>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email id"
              onChange={emailHandler}
            />
          </span>
          <span>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={passwordHandler}
            />
          </span>
          <span>
            <button type="submit">Submit</button>
          </span>
        </form>
      </main>
    </>
  );
};

export default Signup;
