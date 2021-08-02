import React, {useState} from 'react';
import '../App.css';
import '../Components/Join.css';
import {useHistory} from 'react-router-dom';

//import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Join(){
    const [roomId, setRoomId] = useState(0)
    const history = useHistory();
    const handleJoin = () => {
        history.push(`room/${roomId}`)

    }

    return (

        <div>
            <h1>Join Room</h1>
            <hr></hr>
            <label class="joinFormLabel form-label" for="Room ID">Room ID: </label>
            <input class="createFormTextBox form-control" type="text" id="room_id" name="room_id" 
                onChange={event => setRoomId(event.target.value)}/>

            <br></br>
            <button class="joinRoomButton btn btn-primary" onClick={handleJoin}>Join</button>
        </div>
    );
}

export default Join;