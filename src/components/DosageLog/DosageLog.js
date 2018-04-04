import React, { Component } from 'react';
import './DosageLog.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


class DosageLog extends Component {
    constructor(props) {
        super(props);


        this.state = {
            frequencyInput: '',
            // startTimeInput: '',
            amountInput: '',
            reminder_time: [
                {hour:'6:00am', selected: false}, 
                {hour:'7:00am', selected: false}, 
                {hour:'8:00am', selected: false}, 
                {hour:'9:00am', selected: false}, 
                {hour:'10:00am', selected: false}, 
                {hour:'11:00am', selected: false}, 
                {hour:'12:00pm', selected: false}, 
                {hour:'1:00pm', selected: false}, 
                {hour:'2:00pm', selected: false}, 
                {hour:'3:00pm', selected: false}, 
                {hour:'4:00pm', selected: false}, 
                {hour:'5:00pm', selected: false}, 
                {hour:'6:00pm', selected: false}, 
                {hour:'7:00pm', selected: false}, 
                {hour:'8:00pm', selected: false}, 
                {hour:'9:00pm', selected: false}, 
                {hour:'10:00pm', selected: false}, 
                {hour:'11:00pm', selected: false}, 
                {hour:'12:00am', selected: false}, 
                {hour:'1:00am', selected: false}, 
                {hour:'2:00am', selected: false}, 
                {hour:'3:00am', selected: false}, 
                {hour:'4:00am', selected: false}, 
                {hour:'5:00am', selected: false}, 
            ],

            dosage: {
                frequency: '',
                // startTime: 0,
                amount: ''
            }

        }
    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleTimeSelection = this.handleTimeSelection.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleTimeSelection(event) {
        const target = event.target;
        console.log(target.name);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(value);
        const name = target.name;
        let copy = this.state.reminder_time.slice();//makes a copy of reminder_time array of objects
        let clicked = copy.forEach((c) => { // c = current hour selected
            
            if(c.hour == name) {
                c.selected = !c.selected;
            }
        })
       

        this.setState({
            reminder_time: copy //sets state of original reminder_time array to the new copy of reminder_time array
          });
        }

    onSubmit(event) {
        axios.post('/api/hours', {
            // frequency: this.state.frequencyInput,
            // start_time: this.state.startTimeInput,
            // amount: this.state.amountInput,
            reminder_time: this.state.reminder_time,
            patient_id: this.props.id,
            med_name: this.props.med_name,
            med_strength: this.props.med_strength,
            
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
                {/* <div className="dosage">
                    <p>Dosage<br /><input name="frequencyInput" onChange={ (event) => this.handleInput(event) } type="text" value={this.state.frequencyInput} /></p>
                    <p>Select Frequency
                        <select className="select-box">
                        <option value="times per day">Times per day</option>
                        <option selected value="hours">hours</option>
                    </select></p>
                </div> */}

                {/* <div>
                    <p>Reminder time<br /><input name="startTimeInput" onChange={ (event) => this.handleInput(event) } type="text" value={this.state.startTimeInput} /></p>
                    <input id="time" type="time" />
                </div> */}

    
                <div className="hours-select">
                    <h5>Select Reminder Time(s)</h5>
                    {this.state.reminder_time.map((time, i) => {
                        return <div key={i} className="reminder-time">{time.hour}<input type="checkbox" name={time.hour} checked={time.selected} onChange={(e) => this.handleTimeSelection(e)}></input></div>
                    })}
                </div>
                <Link to={`/patientrecords/${this.props.id}`}><button onClick={(event) =>{this.onSubmit()} }>Add Selected Reminder Times</button></Link>

                {/* <div>    
                    <p>How many/much is taken each dose<br /><input name="amountInput" onChange={ (event) => this.handleInput(event) } type="text" value={this.state.amountInput} /></p>
                </div> <br />
                <div>
                    <Link to={`/patientrecords/${this.props.id}`}><button onClick={ () => this.handleSubmit() }>Schedule this dosage</button></Link>
                </div> <br /> */}

            </div>
        )
    }
}

export default DosageLog;