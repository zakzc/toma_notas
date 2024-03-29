import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { NoteAppContext } from "../../store/notes_context";
///
import { Form, Button } from "react-bootstrap";

interface Props {}

const LogInSignUpPage: React.FC<Props> = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorOnCredentials, setErrorOnCredentials] = useState("");

  const router = useRouter();
  const {
    userIsLoggedIn,
    setUserIsLoggedIn,
    noteSets,
    setUserNoteSet,
    setUserEmail,
  } = useContext(NoteAppContext);
  const [dataReturnedFromFetch, setDataReturnedFromFetch] = useState(false);
  if (userIsLoggedIn === true && dataReturnedFromFetch === true) {
    setUserIsLoggedIn(true);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    } else {
      const data = {
        email,
        password,
        requestType: isSignUp ? "signUp" : "logIn",
        userData: noteSets,
      };

      try {
        const res = await fetch("api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        if (result.success === true && result.processed === true) {
          setDataReturnedFromFetch(true);
          setUserIsLoggedIn(true);
          setUserEmail(email);
          setUserNoteSet(result.data);
          if (isSignUp === false) {
            router.push("/");
          } else {
            setIsSignUp(true)
          }
        } else if (result.processed === false) {
          setErrorOnCredentials("Error on user credentials, please try again.");
        } else if (result.success === false) {
          setErrorOnCredentials("Request unsuccessful.");
        }
      } catch (err) {
        console.error("Error:", err);
      }
      return;
    }
  };

  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
    setPasswordsMatch(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <br />
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-3">{isSignUp ? "Sign Up" : "Log In"}</h1>
        <br />
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        {isSignUp && (
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                border: passwordsMatch ? "1px solid #ced4da" : "1px solid red",
              }}
            />
            {!passwordsMatch && (
              <Form.Text className="text-danger">
                Passwords do not match.
              </Form.Text>
            )}
            <br /> <br />
          </Form.Group>
        )}
        <Button variant="primary" type="submit">
          {isSignUp ? "Sign Up" : "Log In"}
        </Button>
        <br /> <br />
        <Form.Text className="text-muted mt-2">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}

          <Button
            variant="link"
            className="p-0 ml-1"
            onClick={handleSwitch}
            style={{ fontWeight: "bold" }}
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </Button>
          <br />
          <h6 style={{ backgroundColor: "yellow" }}> {errorOnCredentials}</h6>
          <br />
        </Form.Text>
      </Form>
    </div>
  );
};

export default LogInSignUpPage;
