import { useEffect, useState } from "react";
import api from "../api";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isActive, setIsActive] = useState(false);

  async function registerUser(e) {
    e.preventDefault();
    if (userPassword === confirmPass) {
      try {
        const res = await api.post("/users/register", {
          email: userEmail,
          password: userPassword
        });
        if (res.status === 201) {
          console.log("Notyf success");
          navigate("/login");
        }
      } catch (error) {
        console.log("Error in registration: ", error);
      } 
    } else {
      console.error("Passwords do not match.");
    }
    
  }

  useEffect(() => {
    if (userEmail !== "" && userPassword !== "" && confirmPass !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [userEmail, userPassword, confirmPass]);

  return (
    <Form className="mx-5" onSubmit={(e) => registerUser(e)}>
      <h1 className="my-5 text-center">Register</h1>
      <Form.Group controlId="userEmail" className="my-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="password" className="my-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="confirmPass" className="my-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />
      </Form.Group>

      {isActive ? (
        <Button variant="primary" type="submit" id="submitBtn">
          Submit
        </Button>
      ) : (
        <Button variant="danger" type="submit" id="submitBtn" disabled>
          Submit
        </Button>
      )}
    </Form>
  );
}
