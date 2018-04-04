import React, { Component } from 'react';
import './Doctor.css';
import axios from 'axios';

class Doctor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameInput: '',
            phone: '',
            address: '',
            hospital: '',

            doctor: {
                id: 0,
                doctor_name: '',
                phone: 0,
                address: '',
                hospital: ''
            }

        }
    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        axios.post('/api/doctor', {
            doctor_name: this.state.nameInput, 
            phone: this.state.phoneInput, 
            address: this.state.addressInput, 
            hospital: this.state.hospitalInput
        })
        .then((response) => {
            console.log(response.data);
            this.setState({doctor: response.data[0]})
            this.props.history.push('/doctor')
        }).catch(console.log)
    }
    render() {
        let doctor = this.state.doctor;
        return (
            <div className="doctor">
                <h5>My Doctor's Info</h5> <br />

                <div className="doc-container">
                    <div className="doc-info">
                        <p> Name <br/> <input name="nameInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.nameInput} /> </p>
                        <p> Phone <br/> <input name="dobInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.phoneInput} /> </p>
                    </div> <br />
                     
                    <div className="doc-address">
                        <p>Address < br /><input name="streetInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.streetInput} /></p>
                        <p>Hospital/Clinic Name < br /><input name="hospitalInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.hospitalInput} /></p>
                    </div><br />
                    <div>
                        <button className="add-doctor" onClick={() =>this.onSubmit() }>Add Doctor's Information</button>
                    </div>

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

export default Doctor;