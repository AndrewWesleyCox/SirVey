import React from 'react';
import './App.css';

import Navigation from './Components/Navigation';
import Home from './Components/Home';
import About from './Components/About';
import Create from './Components/Create';
import Join from './Components/Join';
import Room from './Components/Room';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import {BrowserRouter as Router, Switch, Route, HashRouter} from 'react-router-dom';


function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/create" exact component={Create} />
          <Route path="/join/" exact component={Join} />
          <Route path="/room/:roomId" exact component={Room} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </div>
    </HashRouter>
  );
}









/*
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      foobar: null
    }
}
  
  componentDidMount() {
    axios.get('http://127.0.0.1:8000/option/').then((response) => {
      this.setState({
        foobar: response.data
      })
    })
  }
  
  render() {
    console.log(this.state.foobar)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.foobar ? (<div>
          {this.state.foobar['hello there']} If you general kenobi its working....
          </div>
        ) : (
          <div>...Loading</div>
        )}
      </div>
    );
  }
}
*/
export default App;
