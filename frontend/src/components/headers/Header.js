import React from 'react'
import logo from '..//../images/icon-left-font-monochrome-white.jpg'
import { Link } from "react-router-dom";

function Header() {
    return (
        <div>
            <nav className="navbar">
                <ul className="nav__list-ul">
                    <li className="nav__list-li logo">
                        <Link to={'/'} >
                            <img src={logo} alt="logo"></img>
                        </Link>
                    </li>
                    <li className="nav__list-li">
                        <Link to={'/login'} className="navbar__style">
                            <h2 className="hover">LOGIN</h2>
                        </Link>
                    </li>
                    <li className="nav__list-li">
                        <Link to={'/messages/new'} className="navbar__style">
                            <h2 className="hover">New Message</h2>
                        </Link>
                    </li>
                    <li className="nav__list-li">
                        <Link to={'/userprofile'} className="navbar__style">
                            <h2 className="hover">User Profile</h2>
                        </Link>
                    </li>
                </ul>
            </nav>
            <header className="header header__img">
                <div className="header__banner">
                    <h2 className="header__banner--title"> Bienvenu sur le reseau social de Groupomania! </h2>
                </div>
            </header>
        </div>
    )
}

export default Header
