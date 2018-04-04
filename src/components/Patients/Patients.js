import React, { Component } from 'react';
import Households from '../Households/Households';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import { getUser } from '../../ducks/reducer';

import './Patients.css'

class Patients extends Component {
    constructor(props) {
        super(props);

        this.state = {
            HouseholdPatients: [],
            phoneModal: false,
            phoneInput: ''
        }

    // this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount(){
        if (this.props.user){
            this.getPatients(this.props.user.hh_id)
            console.log(this.state);
            console.log(this.props.user);
            if(!this.props.user.phone) {
                this.setState({phoneModal:true})
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if(!this.props.user && nextProps.user){
            // let patientID= this.props.match.params.id; // how to get the id param in the url
            this.getPatients(nextProps.user.hh_id)
            console.log(nextProps.user);
            if(!nextProps.user.phone) {
                this.setState({phoneModal:true})
            }
        }
        if(nextProps.user && nextProps.user.phone) {
            this.setState({phoneModal: false})
        }
    }

    getPatients(hh_id){
        axios.get(`/api/household/${hh_id}/patients`).then((res) => {
            console.log(res.data)
            this.setState({ HouseholdPatients: res.data })
        }).catch((err) => console.log("err", err));
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }
//phone http request
    submitPhone(event) {
        let body = {phone: this.state.phoneInput}
        axios.put('/api/user/phone', body).then( (res) => {
            console.log(res.data)
            this.props.getUser();
        }).catch(console.log)
    }


    render() {

        const patients = this.state.HouseholdPatients.map((patient, i) => {
            return <Link key={i} to={`/patientrecords/${patient.id}`} className="pat-tile"><h1>{patient.patient_name} ></h1></Link>
        })
        return (
            <div>
                <div className="patient-list">
                    {patients}
                </div>
                <div>
                    <Link to="/newpatient"><button className="sub-btn">Add New Patient</button></Link>
                </div> <br />

                {
                    this.state.phoneModal
                    ? 
                    <div>
                        Please provide a phone number for reminder notification 
                        <div>
                        <input name="phoneInput" onChange={ (event) => this.handleInput(event) } type="text" value={this.state.phoneInput} />
                            <button onClick={(event) =>{this.submitPhone()} }>Submit</button>
                        </div>
                    </div>
                    :
                    null

                }

            </div>

        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(Patients);