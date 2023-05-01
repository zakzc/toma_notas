import { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface Props {}

const logInSignUp: React.FC<Props> = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    const data = { email, password };
    const url = isSignUp ? "api/user" : "api/user/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.error(err);
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
          {isSignUp
            ? "Already have an account? "
            : "Don't have an account? "}
          <Button
            variant="link"
            className="p-0 ml-1"
            onClick={handleSwitch}
            style={{ fontWeight: "bold" }}
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </Button>
        </Form.Text>
      </Form>
    </div>
  );
};

export default logInSignUp;
