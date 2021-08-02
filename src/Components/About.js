import React from 'react';
import '../App.css';
import '../Components/About.css';
import { Card, Table } from 'react-bootstrap'
import alex from '../AboutPictures/AlexWebber.jpg';
import will from '../AboutPictures/WillGivens.jpg';
import zach from '../AboutPictures/ZachDoster.jpg';
import andrew from '../AboutPictures/AndrewCox (2).jpg';
import brett from '../AboutPictures/BrettKoonce.jpg';

function About(){
    return (
        <div>
            <h2 class="text-dark">Sirvey Creators</h2>
            <hr></hr>
            <Table>
            <tbody>
                <tr>
                    <th>
                    <Card className="aboutCard">
                        <Card.Img className="aboutImage" variant="top" src={alex} />
                        <Card.Body>
                            <Card.Title>Alex Webber</Card.Title>
                            <Card.Text>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </th>
                    <th>
                    <Card className="aboutCard">
                        <Card.Img className="aboutImage" variant="top" src={zach} />
                        <Card.Body>
                            <Card.Title>Zach Doster</Card.Title>
                            <Card.Text>

                            </Card.Text>
                        </Card.Body>
                    </Card>    
                    </th>
                    <th>
                    <Card className="aboutCard">
                        <Card.Img className="aboutImage" variant="top" src={will} />
                        <Card.Body>
                            <Card.Title>Will Givens</Card.Title>
                            <Card.Text>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </th>
                </tr>
                <tr>
                    <td>
                    <Card className="aboutCard">
                        <Card.Img className="aboutImage" variant="top" src={andrew} />
                        <Card.Body>
                            <Card.Title>Andrew Cox</Card.Title>
                            <Card.Text>

                            </Card.Text>
                        </Card.Body>
                    </Card> 
                    </td>
                    <td>
                    <Card className="aboutCard">
                        <Card.Img className="aboutImage" variant="top" src={brett} />
                        <Card.Body>
                            <Card.Title>Brett Koonce</Card.Title>
                            <Card.Text>

                            </Card.Text>
                        </Card.Body>
                    </Card>    
                    </td>
                    <td>

                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default About;