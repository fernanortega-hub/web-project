import React from 'react';
import Login from './Pages/Login';
import User from './Pages/User'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login"
          element = {
            <div className="flex justify-center items-center bg-gray-300 h-screen">
              <Login />
            </div>
          }
        />
        <Route path="/main"
          element = {
            <div className="flex justify-center items-center bg-gray-300 h-screen">
              <User />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
