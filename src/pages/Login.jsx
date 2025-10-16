import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useUser } from "../userContext";

export default function Login() {
  const navigate = useNavigate();
  const {setUser} = useUser();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  async function loginUser(e) {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", {
        email: userEmail,
        password: userPassword
      });
      if (res.data.access) {
        await initUser(res.data.access);
        console.log("Login Success");
        navigate("/movies");
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
  }

  async function initUser(token) {
    localStorage.setItem("token", token);
    try {
      let res = await api.get("/users/details");
      setUser({
        token: token,
        isAdmin: res.data.user.isAdmin
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (userEmail !== "" && userPassword !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [userEmail, userPassword]);

  return (
    <Form className="mx-5" onSubmit={(e) => loginUser(e)}>
      <h1 className="my-5 text-center">Login</h1>
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