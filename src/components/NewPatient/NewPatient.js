import React, { Component } from 'react';
import './NewPatient.css';
import axios from 'axios';

class NewPatient extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameInput: '',
            dobInput: '',
            streetInput: '',
            cityInput: '',
            stateInput: '',
            zipcodeInput: '',
            allegiesInput: '',

            patient: {
                id: 0,
                patient_name: '',
                dob: 0,
                gender: '',
                patient_weight: 0,
                hh_id: 0
            }

        }
    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        axios.post('/api/patient', {
            patient_name: this.state.nameInput, 
            dob: this.state.dobInput, 
            street: this.state.streetInput, 
            city: this.state.cityInput, 
            state: this.state.stateInput, 
            zipcode: this.state.zipcodeInput, 
            allegies: this.state.allegiesInput 
        })
        .then((response) => {
            console.log(response.data);
            this.setState({patient: response.data[0]})
            this.props.history.push('/patients')
        }).catch(console.log)
    }
    render() {
        let patient = this.state.patient
        return (
            <div className="patient">
                <h5>Add New Patient</h5> <br />
                <div className="main-container">
                    <div className="personal-info">
                        <p>Name <br/><input name="nameInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.nameInput} /></p> 
                        <p>Date of Birth <br/><input name="dobInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.dobInput} /> </p>
                    </div>
                    <div>
                        <br />
                        <h6>Address</h6>
                        <div className="address-container"> 
                            <div className="address-one">
                                Street <input name="streetInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.streetInput} />
                                City <input name="cityInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.cityInput} />
                            </div><br />
                            <div className="address-two">
                                State <input name="stateInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.stateInput} />
                                Zip code <input name="zipcodeInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.zipcodeInput} />
                            </div><br />
                        </div>
                    </div>
                    <div className="allegies">
                        <h6>Known Allergies <br /> <textarea name="allergiesInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.allegiesTextarea} /> </h6>
                    </div><br />
                    <button className="add-button" onClick={() =>this.onSubmit() }>Add Patient</button>
                </div>

                <br />

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

export default NewPatient;