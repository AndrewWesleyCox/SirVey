import React, { useState, useEffect} from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import API from '../Api.js';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Option from './Option';
import Cookies from 'js-cookie';
import BinaryChart from './BinaryChart';
import ScaleChart from './ScaleChart';

// load dataset into state, then show iteratively show one option
// one at a time, once they've voted send it to api,
// then show next in dataset
function Room(){
    let dataset = {};
    //let options = [];
    let { roomId } = useParams();

    const [options, setOption] = useState([]);
    const [currentOption, setCurrentOption] = useState({});
    const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);
  
    useEffect(() => {
        if (Cookies.get('voted-cookie') === roomId) {
            getResults();
        }
        API.get(`/roomAPI/${roomId}/`).then((response) => {
            dataset = response.data.rooms[0].dataset;
            // options = dataset.options;
            setCurrentOptionIndex(0);
            setCurrentOption(dataset.options[0]);
            setOption(dataset.options);
            console.log(options);
        });
    }, []); 

    const getResults = () => {
        API.get(`/resultAPI/${roomId}`).then((response) => {
            console.log(response);
            setResults(response.data.results);
            setShowResults(true);
        });
    }

    const showResultsPage = () => {
        Cookies.set('voted-cookie', roomId);
        getResults();
    }

    const incrementOption = () => {
        if (currentOptionIndex < options.length - 1) {
            setCurrentOption(options[currentOptionIndex + 1]);
            setCurrentOptionIndex(currentOptionIndex + 1);
        }
        else {
            showResultsPage();
        }
    }

    const handleBinaryVote = (vote) => {
        console.log(options);
        var option_id = currentOption.id;
        API.get()
        console.log(vote);
        API.post('/resultAPI/', {
            room_id: roomId,
            option_id,
            value:  vote ? '1' : '0',
        }).then((response) => {
            if (response)
                incrementOption();
        });

        
    }

    const handleScaleVote = () => {
        let value = options.length;
        
        // loop through options and post result with value = maxValue for first option, decrementing after
        options.forEach((option) => {
            API.post('/resultAPI/', {
                room_id: roomId,
                option_id: option.id,
                value,
            }).then((response) => {
                console.log(response);
            });
            value -= 1;
        });

        showResultsPage();
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const changedOption = options.find(x => x.id === parseInt(draggableId));

        const newOptions = options;
        newOptions.splice(source.index, 1);
        newOptions.splice(destination.index, 0, changedOption);

        setOption(newOptions);
        
    }

    const manipResults = () => {
        let data = results;
        if (data !== []) {
            data = Object.keys(data).map(key => {
                return data[key];
            });
            data = data.map((o) => {
                return {name: o.option.name, value: o.value}
            })
            console.log(data);
            return data;
        }
        return [];
    }
    
    const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    `;
    const Title = styled.h3`
    padding: 8px;
    `;
    const OptionsList = styled.div`
    padding: 8px;
    `;

    // TODO: make this look good
    return (
        <div>
            <h1>Room Page</h1>
            <h2>Room ID: {roomId} </h2>

            <div>
                { !showResults ?
                <div>
                    { currentOption.voting_type === "B" ? 
                        
                        <div>
                            { currentOption.name }
                         
                            <button id="yes" 
                                onClick={() => handleBinaryVote(true)}>
                                    Yes
                            </button>
                            <button id="no" 
                                onClick={() => handleBinaryVote(false)}>
                                No
                            </button>
                        </div>
                        :
                        <div> 
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Container>
                                    <Title>Order from best (top) to worst (bottom) </Title>
                                    <Droppable droppableId='1'>
                                        {provided => (
                                            <OptionsList
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {options.map((o, index) => (
                                                    <Option key={o.id} option={o} index={index} />
                                                ))}    
                                                {provided.placeholder}
                                            </OptionsList>
                                        )}
                                        
                                    </Droppable>
                                    
                                </Container>
                            </DragDropContext>
                            <button id="scaleSubmit"
                                onClick={handleScaleVote}>
                                Submit
                            </button>
                        </div>
                    }
                </div>
                : 
                <div>
                    { currentOption.voting_type === "B" ? 
                        <div>  
                            <h3>Results</h3>
                            <BinaryChart results_data = {manipResults()}/>
                        </div>
                    :
                        <div> 
                            <h3>Results</h3>
                            <BinaryChart results_data = {manipResults()}/>
                        </div>
                    }
                </div>
                }
            </div>
            
        </div>
    );
}

export default Room;