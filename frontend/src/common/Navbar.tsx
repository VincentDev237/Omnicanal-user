import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IUser } from '../types/user.type'
import AuthService from '../services/auth.service'
import EventBus from './EventBus'
const Navbar = () => {
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false)
  const [showSuperviseurBoard, setShowSuperviseurBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined)
  
  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowSuperviseurBoard(user.roles.includes("ROLE_SUPERVISEUR"))
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"))
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, [])
  
  const logOut = () => {
    AuthService.logout();
    setShowSuperviseurBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <nav className='navbar navbar-expand navbar-dark bg-dark'>
      <div className='container-fluid'>
      <Link to="/" className="navbar-brand">Admin</Link>
      <div className='navbar-nav mr-auto'>
        <li className='nav-item'>
          <Link to="/home" className="nav-link">Accueil</Link>
        </li>

        {showSuperviseurBoard && (
          <li className='nav-item'>
            <Link to="/super" className="nav-link">Superviseur</Link>
          </li> 
        )}

        {showAdminBoard && (
          <li className='nav-item'>
            <Link to="/admin" className="nav-link">Administrateur </Link>
          </li> 
        )}
        
        {currentUser && (
          <li className='nav-item'>
            <Link to="/user" className="nav-link">Agent </Link>
          </li> 
        )}
      </div>

      {
        currentUser ? (
          <div className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link to="/profile" className="nav-link">
                {currentUser.username}
              </Link>
            </li> 
            <li className='nav-item'>
              <Link to="/login" className="nav-link" onClick={logOut}>
                LogOut
              </Link>
            </li> 
          </div>
        ) : (
          <div className='navbar-nav ms-auto'>
          <li className='nav-item'>
            <Link to="/login" className="nav-link">
              Se connecter
            </Link>
          </li> 
          <li className='nav-item'>
            <Link to="/register" className="nav-link" >
              S'inscrire
            </Link>
          </li> 
        </div>
            
        )
        }
        </div>
    </nav>
  )
}

export default Navbar;
