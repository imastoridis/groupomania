import React, { Fragment } from 'react'
import logo from '../../images/icon-left-font-monochrome-white.png'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";

function Header(props) {
    const handleLogout = e => {
        e.preventDefault();
        Cookies.remove("token");
        props.logout();
    };
    return (
        <div>
            <nav className="navbar">
                <ul className="nav__list-ul">
                    {!props.loggedIn ? (
                        //If user logged out show login/register tabs
                        <Fragment>
                            <li className="nav__list-li logo">
                                <Link to={'/'} >
                                    <img src={logo} alt="logo"></img>
                                </Link>
                            </li>
                            <li className="nav__list-li">
                                <Link to={'/login'} className="navbar__style">
                                    <h2 className="hover">Connexion</h2>
                                </Link>
                            </li>
                            <li className="nav__list-li">
                                <Link to={'/register'} className="navbar__style">
                                    <h2 className="hover">Inscription</h2>
                                </Link>
                            </li>
                        </Fragment>
                    ) : (
                            //If user logged in hide login/register tabs
                            <ul className="nav__list-ul">
                                <li className="nav__list-li logo">
                                    <Link to={'/'} >
                                        <img src={logo} alt="logo"></img>
                                    </Link>
                                </li>
                                <li className="nav__list-li">
                                    <Link to={'/messages'} className="navbar__style">
                                        <h2 className="hover">Tableau de bord</h2>
                                    </Link>
                                </li>
                                <li className="nav__list-li">
                                    <Link to={'/messages/new'} className="navbar__style">
                                        <h2 className="hover">Nouveau message</h2>
                                    </Link>
                                </li>
                                <li className="nav__list-li">
                                    <Link to={'/userprofile'} className="navbar__style">
                                        <h2 className="hover">Profil</h2>
                                    </Link>
                                </li>
                                <li className="nav__list-li">
                                    <Link to={'/login'} className="navbar__style" onClick={handleLogout}>
                                        <h2 className="hover">Déconnexion</h2>
                                    </Link>
                                </li>
                            </ul>
                        )}
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
const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({ type: "SET_LOGOUT" })
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);