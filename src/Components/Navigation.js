import React from 'react';
import '../App.css';
import '../Components/Navigation.css';
// import button from'../css/bootstrap.min.css';
// import {Link} from 'react-router-dom';
// import { Navbar,Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import {NavLink} from 'react-router-dom';
import logo from '../SirveyLogoWhite.png';

function Navigation(){

    return (
        <div className="navBarContainer">
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand ><img class="navLogoImage" src={logo} alt="no img"/></Navbar.Brand>
                <NavLink className="navBarLink" to='/'>Home</NavLink>
                <NavLink className="navBarLink" to='/about'>About</NavLink>
                <NavLink className="navBarLink" to='/create'>Create Room</NavLink>
                <NavLink className="navBarLink" to='/join'>Join Room</NavLink>
                <NavLink className="navBarLink" to='/signin'>Sign In</NavLink>
                <NavLink className="navBarLink" to='/signup'>Sign Up</NavLink>

            </Navbar>
        </div>
    );
}

export default Navigation;