import React from 'react';
import '../App.css';
import '../Components/Home.css';
import {Link} from 'react-router-dom';

function Home(){
    return (
        <div>
            <h1 class="text-dark">Welcome to Sirvey!</h1>
            <hr></hr>
            <h4 class="text-secondary">Sirvey is an online survey tool that enables groups of people to 
                quickly and effectively make decisions.
            </h4>
            <br></br>
            <br></br>
            <h4 class="text-secondary">
                To get started, click on  <Link class="homePagebtn btn btn-dark" to="/create" tag="button">Create Room</Link>, 
            or if you would like to join an existing room, click <Link class="homePagebtn btn btn-dark" to="/join" tag="button">Join Room</Link>.
            </h4>
        </div>
    );
}

export default Home;