import React, {useState} from 'react';
import API from '../Api.js';
import '../App.css';
import '../Components/Create.css';
import {useHistory} from 'react-router-dom';


function Create(){
    const [inputFields, setInputFields] = useState([
        { name: '' },
    ]);
    const [votingType, setVotingType] = useState('B'); 

    const history = useHistory();

    const handleSubmit = () => {
        console.log("InputFields", inputFields);
        console.log("VotingType", document.getElementById("type").value);
        console.log("Name", document.getElementById("name").value);

        // TODO: should only send dataset to database if user is logged in
        //       otherwise, should have alternative Room POST request which
        //       accepts the dataset (doesn't need to be in database)

        var dataset_id;

        // First send POST request to set up dataset
        API.post('dataset/', {
            name: document.getElementById("name").value, 
            options: inputFields.map(x => ({...x, voting_type: votingType}))
        }).then((response) => {
            console.log(response.data.dataset_id);
            dataset_id = response.data.dataset_id;
            console.log(dataset_id);
            // Then send room POST request
            // BUT FIRST: need to set up 
            // can do this stuff outside the .then block if we used async api calls
            //var user_id = 1; // TODO: need to add auth and get user_id from there
            var expire = 1615773980; // TODO: need to add room expiration as user parameter
            var room_status = 'D' // TODO: not sure what room status is, but we need to implement it

            var roomId = null;

            API.post('roomAPI/', {
                dataset_id,
                expire,
                room_status,
            }).then((response) => {
                console.log(response);
                roomId = response.data.id;
                history.push(`/room/${roomId}`)
            }).catch((error) => {
                console.error('Error sending room request', error);
            });

            console.log(roomId);

        }).catch((error) => {
            console.error('Error sending dataset request', error);
        });

        
    }

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    const handleAddFields = (e) => {
        e.preventDefault();
        setInputFields([...inputFields, {name: ''}]);
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        if(index === 0){
            setInputFields([{name: ''}]);
        }
        else{
            values.splice(index, 1);
            setInputFields(values);
        }
    }

    const handleClearFields = () => {
        setInputFields([{name: ''}]);
    }

    const changeVotingType = (e) => {
        setVotingType(e.target.value);
    }

    return (
        <div class="form-group">
            <h2>Create Set</h2>
            <hr></hr>
            <form onSubmit={e => e.preventDefault()}>
                <div>
                    <label class="createFormLabel form-label" for="name">Set Name: </label>
                    <input class="createFormTextBox  form-control" type="text" id="name" name="name" />

                    <label class="createFormLabel form-label" for="type">Voting Type: </label>
                    <select class="selectpicker" id="type" name="type" onChange={changeVotingType}>
                        <option value="B">Like/Dislike</option>
                        <option value="S">Scale</option>
                    </select>
                </div>
                
                {
                    inputFields.map((inputField, index)=>(
                        <div key={index}>
                            <label class="createFormLabel form-label" for="name">Item #{index + 1}</label>
                            <input class="createFormTextBox form-control" type="text" id="itemName" name="name" value={inputField.name} onChange={event => handleChangeInput(index, event)} />
                            <button className="createFormRemove btn" onClick={() => handleRemoveFields(index)}>X</button>
                        </div>
                    ))
                }
                <button class="createFormButton  btn btn-primary" onClick={handleAddFields}>Add Item</button>
                <button class="createFormButton  btn btn-primary" onClick={handleClearFields}>Clear Form</button>
                <input  class="createFormButton btn btn-primary" type="submit" value="Submit" onClick={handleSubmit}/>
            </form>
        </div>
    );
}

export default Create;