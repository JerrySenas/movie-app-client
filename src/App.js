import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import { UserProvider } from './userContext';
import Movies from './pages/Movies';
import AddMovie from './pages/AddMovie';

function App() {
  return (
    <UserProvider>
      <Router>
        <Container>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/addMovie' element={<AddMovie />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
