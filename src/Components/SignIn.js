import React from 'react';
import Cookies from 'js-cookie'
import '../App.css';
import '../Components/SignIn.css';
import API from '../Api.js';
// import { Form,FormControl} from 'react-bootstrap'
import {Link} from 'react-router-dom';

function SignIn(){

    const handleSignIn = () => {
        // Submit to server
        //if good sign in
        //if bad let user know what went bad
        //

        // whoops this is code for sign up, sign in not currently implemented
        // in backend
        const formEmail = document.getElementById("email").value;
        const formUsername = document.getElementById("username").value;
        const formPassword = document.getElementById("password").value;
        const user = {
            email: formEmail,
            username: formUsername,
            password: formPassword,
        }
        console.log("hello theeree")
        console.log(document.getElementById("password"))
        API.post('login/', user)
            .then((response) => {
                console.log(response);
                Cookies.set('sirvey.username', response.data.username, { expires: 7, sameSite: 'strict' })

            // need to store user_id in some sort of global state variable
            })
            .catch((error) => console.log(error))
    }

    return (
        <div class="form-group">
            <h2 class="text-dark">Sign In</h2>
            <hr></hr>
            <form onSubmit={e => e.preventDefault()}>
                <div >
                    <label for="email" class="loginFormLabel form-label text-secondary">Email</label>
                    <input class="loginFormTextBox form-control" type="text" id="email" name="email" />
                </div>
                <div >
                    <label for="username" class="loginFormLabel form-label text-secondary">Username</label>
                    <input class="loginFormTextBox form-control" type="text" id="username" name="username" />
                </div>
                <div >
                    <label for="password" class="loginFormLabel form-label text-secondary">Password</label>
                    <input class="loginFormTextBox form-control" type="password" id="password" name="password" />
                </div>

                <input class="loginFormbtn btn btn-primary" type="submit" value="Sign In" onClick={handleSignIn}/>
                <br></br><p class="text-secondary">Or if you don't have an account</p>
                <Link class="loginFormbtn btn btn-primary" to="/signup" tag="button">Sign Up</Link>
                
                
            </form>
        </div>
    );
}

export default SignIn;