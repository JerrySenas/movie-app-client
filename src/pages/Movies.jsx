import { useNavigate, NavLink } from "react-router-dom";
import { useUser } from "../userContext";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import api from "../api";

export default function Movies() {
  const {user} = useUser();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function fetchMovies() {
    setIsLoading(true);
    const res = await api.get("/movies/getMovies");
    setMovies(res.data.movies);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      console.log(user)
      fetchMovies();
    }
  }, []);

  if (user.isAdmin) {
  return (
    <div className="container">
      <NavLink to={"/addMovie"} id="addMovie" className="btn btn-md btn-success my-3">Add Movie</NavLink>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Description</th>
            <th>Year</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => {
          return (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.description}</td>
              <td>{movie.year}</td>
              <td>{movie.genre}</td>
            </tr>
          )
          })}
        </tbody>
      </table>
    </div>
  )
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Movies</h2>
      </div>
      <hr />

      {
        isLoading ? 
          <div className="text-center my-5 py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        :
          !movies.length ?
            <div>
              <h5>No movies</h5>
            </div>
          :
            movies.map(movie => {
              return (
                <div className="card p-4 mb-4" key={movie._id}>
                  <div>
                    <h4 className="fw-bolder">{ movie.title } ({movie.year})</h4>
                    <h5>Directed by: { movie.director } | Genre: {movie.genre}</h5>
                    <p>{movie.description}</p>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-md btn-primary" onClick={() => {
                      setSelectedMovie(movie);
                      setShowModal(true);
                    }}>View Movie</button>
                  </div>
                </div>
              )
            })
      }
      <Modal show={showModal} onHide={() => {setShowModal(false); setSelectedMovie(null);}}>
        <Modal.Header closeButton><Modal.Title>Movie Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedMovie && (
            <div className="card p-4 mb-4">
              <div>
                <h4 className="fw-bolder">{ selectedMovie.title } ({selectedMovie.year})</h4>
                <h5>Directed by: { selectedMovie.director } | Genre: {selectedMovie.genre}</h5>
                <p>{selectedMovie.description}</p>
                <h5>Comments: </h5>
                {selectedMovie.comments.length ? (
                  <ul className="list-group list-group-flush">
                    {selectedMovie.comments.map((c, i) => (
                      <li key={i} className="list-group-item">{c.comment}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            </div>
            )
          }
        </Modal.Body>
      </Modal>
    </div>
  )
  
}