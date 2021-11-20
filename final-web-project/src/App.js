import React from 'react';
import Login from './Pages/Login';
import User from './Pages/User'
import Admin from './Pages/Admin';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login"
          element={
            <div className="flex justify-center items-center bg-gray-300 h-screen">
              <Login />
            </div>
          }
        />
        <Route exact path="/user"
          element={
            <div className="flex justify-center items-center bg-gray-300 h-screen">
              <User />
            </div>
          }
        />

        <Route exact path="/admin"
          element={
            <div className="flex justify-center items-center bg-gray-300 h-screen">
              <Admin />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
