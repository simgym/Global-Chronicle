import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../Index";
import "./Signup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [displayError, setDisplayError] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
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
        <div className="account">
          <p>No account?</p>
          <Link to="/signup">Get one here.</Link>
        </div>
      </main>
    </>
  );
};

export default Login;
