import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            show: false
        }

    }

    toggleSidebar=()=> {
    this.setState({show: !this.state.show});
    }

    render() {
        return (
            <div className="nav">
                <div onClick={this.toggleSidebar} className="w3-bar-item w3-button w3-xxxlarge w3-hover-theme">&#9776;</div>
                <h1>pillsOnTime</h1>
                <nav className="sidebar" id="mySidebar">
                    <div className={this.state.show ? "show" : "notshow"}>
                        <Link className="menu-button" to="/">Home</Link>
                        <Link className="menu-button" to="/patients">Patients</Link>
                        <Link className="menu-button" to="/newmedication">Add Meds</Link>
                        <Link className="menu-button" to="/patientrecords">Patient Records</Link>
                    </div>
                </nav>
                <div/>
            </div>
        );
    }
}

export default Header;