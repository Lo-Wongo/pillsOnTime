import React, { Component } from 'react';
import './PatientRecords.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import MedicationTile from '../MedicationTile/MedicationTile';


class PatientRecords extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meds: [],
            patient: {}
        }
    this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        console.log("componentDidMount");
        if (this.props.user){
            console.log("patient id", this.props.match.params.id);
            let patientID= this.props.match.params.id; // gets id param from the url in app.js
            this.getPatients(patientID)
        }
    }
    componentWillReceiveProps(nextProps) {
        if(!this.props.user && nextProps.user){
            let patientID= this.props.match.params.id; // gets id param from the url in app.js
            this.getPatients(patientID)
        }
    }

    getPatients(patient_id){
        axios.get(`/api/individualrecords/${patient_id}`).then((res) => {
            console.log('res data',res.data)
            this.setState({ meds: res.data.medications, patient: res.data.patient })
        }).catch((err) => console.log("err", err));
    }

    handleClick() {
        this.state.value;
    }

    render() {
        console.log("Hello");
        const patient = this.state.patient
        const meds = this.state.meds.map((med, i) => {
            return (
                <MedicationTile med={med} key={i} />
            )
        })

        return (
            <div>
                <div className="patient-list">
                    <h3>Patient Name: {patient.patient_name}</h3>
                </div>
                <p>Current Medications</p>
                <div className="current-meds">
                {meds}
                </div> <br />
                <div>
                    <Link to={"/newmedication/" + this.props.match.params.id }><button className="add-med-btn">Add another medication  + </button></Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(PatientRecords);