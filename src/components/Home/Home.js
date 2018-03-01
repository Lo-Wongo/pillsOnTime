import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import abstract from '../../images/abstract.jpg';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    // this.handleClick = this.handleClick.bind(this);

    }

    // handleClick(event) {
    //     this.state.value;
    //     event.preventDefault();
    // }

    render() {
        return (
            <div>
                <div className="bg-div">
                    <img src={ abstract } className="abstract" alt="abstract" />
                </div>
                
                <div className="form">
                    <a href={process.env.REACT_APP_LOGIN}><button className="new-user-btn">New User</button></a>
                    <br />
                    <a href={process.env.REACT_APP_LOGIN}><button className="login-btn">Login</button></a>
                </div> 
                
            </div> 
          
        );
    }
}

export default Home;