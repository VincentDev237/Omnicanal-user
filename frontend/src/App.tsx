import React from 'react'
import './App.css'
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardSuperviseur from './components/BoardSurperviseur';
import BoardAdmin from './components/BoardAdmin';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './common/Navbar';


const App : React.FC = () => {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route  path="/login" element={<Login />} />
          <Route  path="/register" element={<Register />} />
          <Route  path="/profile" element={<Profile />} />
          <Route  path="/home" element={<Home />} />
          <Route  path="/user" element={<BoardUser />} />
          <Route  path="/super" element={<BoardSuperviseur />} />
          <Route  path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
