import React, { Component } from 'react';
import './DosageLog.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


class DosageLog extends Component {
    constructor(props) {
        super(props);


        this.state = {
            frequencyInput: '',
            startTimeInput: '',
            amountInput: '',

            dosage: {
                frequency: '',
                startTime: 0,
                amount: ''
            }

        }
    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        axios.post('/api/dosagelog', {
            frequency: this.state.frequencyInput,
            start_time: this.state.startTimeInput,
            amount: this.state.amountInput,
        })
        .then((response) => {
            console.log(response.data);
            this.setState({medication: response.data[0] })
        }).catch(console.log);

    }

    handleSubmit(){

        let obj = {
            requencyInput: this.state.frequencyInput, 
            startTimeInput: this.state.startTimeInput, 
            amountInput: this.state.amountInput,
        }

        this.props.submitModal(obj)
    }
    handleCancel(){
        this.props.cancelModal()
    }


    render() {
        let dosage = this.state.dosage;
        return (
            <div className="dosage_modal">
                <div>
                    <p>Dose Frequency<br /><input name="frequencyInput" onChange={ (event) => this.handleInput(event) } type="text" value={this.state.frequencyInput} /></p>
                    <select>
                        <option value="select frequency">select frequency</option>
                        <option value="times per day">Times per day</option>
                        <option selected value="hours">hours</option>
                    </select>
                </div>

                <div>
                    <p>Reminder time<br /><input name="startTimeInput" onChange={ (event) => this.handleInput(event) } type="text" value={this.state.startTimeInput} /></p>
                    <input id="time" type="time" />
                </div>

                <div>    
                    <p>How many/much is taken each dose<br /><input name="amountInput" onChange={ (event) => this.handleInput(event) } type="text" value={this.state.amountInput} /></p>
                </div> <br />
                <div>
                    <Link to={`/patientrecords/${this.props.id}`}><button onClick={ () => this.handleSubmit() }>Schedule this dosage</button></Link>
                </div> <br />

            </div>
        )
    }
}

export default DosageLog;