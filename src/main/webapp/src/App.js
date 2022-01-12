import React, {Component} from 'react';
import Header from './components/Header'
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Calendar from "./components/calendar/Calendar";
import SmartInformation from "./components/SmartInformation";
import Events from "./components/Events";
import Home from "./components/Home";

class App extends Component {
    state = {
        isLoggedIn: false,
        latitude: 0,
        longitude: 0
    }

    handleIsLoggedIn = isLoggedIn => {
        this.setState({isLoggedIn: isLoggedIn});
    }

    save({latitude, longitude}) {
        this.setState({latitude: latitude, longitude: longitude});
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.save({latitude: latitude, longitude: longitude});
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <div className="App">
                    <Router>
                        <Header isLoggedIn={this.state.isLoggedIn} onLoggedInChange={this.handleIsLoggedIn}/>
                        <Switch>
                            <Route exact path='/SignIn'><SignIn/></Route>
                            <Route exact path='/SignUp'><SignUp/></Route>
                            <Route exact path='/'><SmartInformation/><Events/><Calendar latitude={this.state.latitude} longitude={this.state.longitude}/></Route>
                        </Switch>
                    </Router>
                </div>
            );
        }
        return (
            <div className="App">
                <Router>
                    <Header/>
                    <Switch>
                        <Route exact path='/'><Home/></Route>
                        <Route exact path='/SignIn'><SignIn onLoggedInChange={this.handleIsLoggedIn}/></Route>
                        <Route exact path='/SignUp'><SignUp/></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
