import React, { Fragment } from 'react'
import logo from '../../images/icon-left-font-monochrome-white.png'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import Button from '@material-ui/core/Button';

function Header(props) {
    const handleLogout = e => {
        e.preventDefault();
        Cookies.remove("token");
        props.logout();
        window.location.reload()
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
                                <Link to={'/login'} >
                                    <Button className="navbar__style">
                                        <h2 className="hover navbar__style">Connexion</h2>
                                    </Button>
                                </Link>
                            </li>

                            <li className="nav__list-li">
                                <Link to={'/register'} className="navbar__style">
                                    <Button className="navbar__style">
                                        <h2 className="hover navbar__style">Inscription</h2>
                                    </Button>
                                </Link>
                            </li>
                        </Fragment>
                    ) : (
                            //If user logged in hide login/register tabs
                            <nav className="navbar">
                                <ul className="nav__list-ul">
                                    <li className="nav__list-li logo">
                                        <Link to={'/'} >
                                            <img src={logo} alt="logo"></img>
                                        </Link>
                                    </li>
                                    <li className="nav__list-li">
                                        <Link to={'/messages'} className="navbar__style">
                                            <Button className="navbar__style">
                                                <h2 className="hover navbar__style">Tableau de bord</h2>
                                            </Button>
                                        </Link>
                                    </li>
                                    <li className="nav__list-li">
                                        <Link to={'/messages/new'} className="navbar__style">
                                            <Button className="navbar__style">
                                                <h2 className="hover navbar__style">Nouveau message</h2>
                                            </Button>
                                        </Link>
                                    </li>
                                    <li className="nav__list-li">
                                        <Link to={'/userprofile'} className="navbar__style">
                                            <Button className="navbar__style">
                                                <h2 className="hover navbar__style">Profil</h2>
                                            </Button>
                                        </Link>
                                    </li>
                                    <li className="nav__list-li">
                                        <Link to={'/login'} className="navbar__style" onClick={handleLogout}>
                                            <Button className="navbar__style">
                                                <h2 className="hover navbar__style">Déconnexion</h2>
                                            </Button>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        )}
                </ul>
            </nav>

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