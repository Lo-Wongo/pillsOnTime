import React, { Component } from 'react';

import DosageLog from '../DosageLog/DosageLog';
import './NewMedication.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

//Parent component, using DosageLog as modal.

class NewMedication extends Component {
    constructor(props) {
        super(props);


        this.state = {
            //Parent object on-state properties// showModal is set to false when button is not clicked
            nameInput: '',
            strengthInput: '',
            showModal: false,

            //properties of the modal component
            frequencyInput: '',
            startTimeInput: '',
            amountInput: '',

            medication: {
                name: '',
                strength: 0
            }

        }
    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.submitModal = this.submitModal.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    // http post request for adding a new medication
    onSubmit(event) {
        axios.post('/api/medication', {
            med_name: this.state.nameInput,
            med_strength: this.state.strengthInput,
            patient_id: this.props.match.params.id
           
        })
        .then((response) => {
            console.log(response.data);
            this.setState({medication: response.data[0] })
        }).catch(console.log);

    }

    componentDidMount() {
        axios.get(`/api/medication/${this.props.match.params.id}`).then( response => {
          let medication = response.data
          this.setState({ 
               med_name: medication.med_name, 
               med_strength: medication.med_strength, 
               frequency: medication.frequency, 
               start_time: medication.start_time, 
               amount: medication.amount 
               })
        }).catch(console.log)
      }
    
      updateMedication(){
          let body = {
              med_name: this.state.med_name,
              med_strength: this.state.med_strength,
              frequency: this.state.frequency,
              start_time: this.state.start_time,
              amount: this.state.amount,
          }
          axios.put(`/api/medication/${this.props.match.params.id}`, body).then( response => {
              this.props.history.push(`/patientrecords/${this.props.match.params.id}`)//routes to patientrecords
          }).catch(console.log)
       }

  deleteMedication(){
      console.log(this.props.match.params.id);
      axios.delete(`/api/medication/${this.props.match.params.id}`).then(response => {
         this.props.history.push('/patientrecords')//routes to patientrecords
      }).catch(console.log)
  }
  

//This passes showModal={true} to the Modal component (DosageLog) and it’s rendered
    showModal() {
        this.setState({showModal: true});
    }

    submitModal(data) {
        this.setState({
            frequencyInput: data.frequencyInput, 
            startTimeInput: data.startTimeInput, 
            amountInput: data.amountInput,
            showModal: false
        })
    }


    cancelModal() {
        this.setState({showModal: false})  
    }

    render() {
        let medication = this.state.medication;
        return (
            <div>

                    {
                        this.state.showModal
                        ?
                        //Here 3 props and their values (id, submitModal, cancelModal)are being created to be sent to the DosageLog component
                        //they become available in the DosageLog component as ${this.props.id or submitModal, or cancelModal}
                        <DosageLog id={ this.props.match.params.id } submitModal={this.submitModal} cancelModal={this.cancelModal} ></DosageLog>
                        :
                        null
                    }
                <div className="med-info">
                    <div>
                        <p>Medication Name<br /><input name="nameInput" onChange={ (event) => this.handleInput(event) } type="text" value={this.state.nameInput} /></p>
                    </div>

                    <div>    
                        <p>Medication Strength<br /><input name="strengthInput" onChange={ (event) => this.handleInput(event) } type="text" value={this.state.strengthInput} /></p>
                    </div> 
               
            
                    <div className="dosage-frequency">
                        <p>Dosage Frequency</p>
                        <div className="frequency">
                            <Link to={`/patientrecords/${this.props.match.params.id}`} style={{display: "inline"}}><button onClick={ () => this.onSubmit() }>As needed</button></Link>
                            <button onClick={ () => this.showModal() }>Scheduled dosage</button>
                        </div>
                    </div>
                </div>
                <br />

                <div>
                    <button className="edit-btn" onClick={ () => this.onSubmit() }>Edit</button>
                    <button className="delete-btn" onClick={ () => this.onSubmit() }>Delete</button>
                </div>
            </div>
        )
    }
}

export default NewMedication;