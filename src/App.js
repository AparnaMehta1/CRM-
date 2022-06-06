import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Login And Register</h1>
      <Router>
        <Routes>
          <Route exact path='/' element={
            <Suspense fallback={<div>Loading...</div>} >
              <Login />
            </Suspense>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
