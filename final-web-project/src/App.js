import React from 'react';
import Login from './Pages/Login';
import MainPage from './Pages/MainPage';
import NotFound from './Pages/NotFound';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/"
          element={
            <div className="flex justify-center items-center bg-gray-300 h-screen">
              <Login />
            </div>
          }
        />
        <Route exact path="/mainpage"
          element={
            <div>
              <MainPage />
            </div>
          }
        />
        <Route path="*" element={
          <NotFound />
        }/>
      </Routes>
    </Router>
  );
}

export default App;
