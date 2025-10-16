import { useEffect, useState } from "react";
import api from "../api";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";

export default function AddMovie() {
  const navigate = useNavigate();
  const {user} = useUser();

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState(2025);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [isActive, setIsActive] = useState(false);

  async function addMovie(e) {
    e.preventDefault();
    try {
      const res = await api.post("/movies/addMovie", {
        title: title,
        director: director,
        year: year,
        description: description,
        genre: genre
      });
      if (res.status === 201) {
        console.log("Notyf success");
        navigate("/movies");
      }
    } catch (error) {
      console.log("Error in registration: ", error);
    }    
  }

  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/movies");
    }
  }, []);

  useEffect(() => {
    if ([title, director, year, description, genre].some((thing) => thing === "" || thing === null)) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [title, director, year, description, genre]);

  return (
    <Form className="mx-5" onSubmit={(e) => addMovie(e)}>
      <h1 className="my-5 text-center">Add Movie</h1>
      <Form.Group controlId="title" className="my-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="director" className="my-3">
        <Form.Label>Director</Form.Label>
        <Form.Control
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="year" className="my-3">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="description" className="my-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="genre" className="my-3">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
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
