import React from 'react';
import Cookies from 'js-cookie'
import '../App.css';
import '../Components/SignIn.css';
import API from '../Api.js';
import {Link} from 'react-router-dom';

function SignUp(){
    const handleSignUp = () => {
        // Submit to server
        //if good sign in
        //if bad let user know what went bad
        //

        const formEmail = document.getElementById("email").value;
        const formUsername = document.getElementById("username").value;
        const formPassword = document.getElementById("password").value;
        const user = {
            email: formEmail,
            username: formUsername,
            password: formPassword,
        }
        API.post('user/', user)
            .then((response) => {
                console.log(response);
                Cookies.set('sirvey.username', response.data.username, { expires: 7, sameSite: 'strict' })
            // need to store user_id in some sort of global state variable
            })
            .catch((error) => {
                console.error('Error sending user post request', error);
            }
        );
    }

    return (
        <div class="form-group">
            <h2 class="text-dark">Sign Up</h2>
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

                <input class="loginFormbtn btn btn-primary" type="submit" value="Create Account" onClick={handleSignUp} />
                <br></br><p class="text-secondary">Or if you have an account</p>
                <Link class="loginFormbtn btn btn-primary" to="/signin" tag="button">Sign In</Link>
                
                
            </form>
        </div>
    );
}

export default SignUp;