import React, { Component } from 'react';
import './EmergencyContacts.css';
import axios from 'axios';

class EmergencyContacts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameInput: '',
            addressInput: '',
            phoneInput: '',

            contact: {
                id: 0,
                contact_name: '',
                address: 0,
                phone: ''
            }

        }
    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        axios.post('/api/contact', {
            contact_name: this.state.nameInput, 
            address: this.state.addressInput, 
            phone: this.state.phoneInput, 
        })
        .then((response) => {
            console.log(response.data);
            this.setState({contact: response.data[0]})
            this.props.history.push('/contact')
        }).catch(console.log)
    }
    render() {
        let contact = this.state.contact;
        return (
            <div className="emergency">
                <h5>In Case Of Emergency</h5> <br />
                <div className="emergency-contacts">
                    <div className="emerg-info">
                        <p>Name < br /><input name="nameInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.nameInput} /> </p>
                        <p>address < br /> <input name="addressInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.addressInput} /> </p>
                        <p>Phone < br /> <input name="phoneInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.phoneInput} /> </p>
                    </div>  <br />
                    <button className="add-contact" onClick={() =>this.onSubmit() }>Add Emergency Contacts</button>
                </div>

                {/* <div>
                    <p>id {patient.id}</p>
                    <p>patient_name {patient.patient_name}</p>
                    <p>dob {patient.dob}</p>
                    <p>street {patient.street}</p>
                    <p>city {patient.city}</p>
                    <p>state {patient.state}</p>
                    <p>zipcode {patient.zipcode}</p>
                    <p>allegies {patient.allegies}</p>
                </div> */}
            </div>
        )
    }
}

export default EmergencyContacts;