import React, { Component } from 'react';
import './InsuranceInfo.css';
import axios from 'axios';

class InsuranceInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            providerInput: '',
            phone: '',
            groupInput: '',
            policyInput: '',
            addressInput: '',
            effectiveInput: '',
            endInput: '',

            provider: {
                id: 0,
                provider: '',
                phone: 0,
                group_name: '',
                policy_name: '',
                address: '',
                effective_date: '',
                end_date: ''
            }

        }
    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        axios.post('/api/provider', {
            provider: this.state.providerInput,
            phone: this.state.phoneInput,
            group_name: this.state.groupInput, 
            policy_name: this.state.policyInput, 
            address: this.state.addressInput, 
            effective_date: this.state.effectiveInput,
            end_date: this.state.endInput
        })
        .then((response) => {
            console.log(response.data);
            this.setState({provider: response.data[0]})
            this.props.history.push('/provider')
        }).catch(console.log)
    }
    render() {
        let provider = this.state.provider;
        return (
            <div className="insurance">
                <div className="med-insurance">
                    <h5>Medical Insurance</h5> <br />

                    <div className="medical-container">
                        <div className="provider-info">
                            Insurance Provider <input name="providerInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.providerInput} /> 
                            Phone <input name="phoneInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.phoneInput} />
                        </div> <br />
                        <div className="provider-info">
                            Group Name <input name="groupInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.groupInput} /> 
                            Policy Name <input name="policyInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.policyInput} />
                        </div> <br />
                        
                        <div className="provider-address">
                            <p>Address < br /><input name="addressInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.addressInput} /></p>
                        </div><br />
                        <div className="hospital">
                            <p>Effective Date < br /><input name="effectiveInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.effectiveInput} /></p>
                            <p>End Date < br /><input name="endInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.endInput} /></p>
                        </div><br />
                        <div>
                            <button className="add-insuranceinfo" onClick={() =>this.onSubmit() }>Add Insurance Information</button>
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

                <div>
                    <h5>Dental Insurance</h5> <br />

                    <div className="dental-container">
                        <div className="provider-info">
                            Insurance Provider <input name="providerInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.providerInput} /> 
                            Phone <input name="phoneInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.phoneInput} />
                        </div> <br />
                        <div className="provider-info">
                            Group Name <input name="groupInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.groupInput} /> 
                            Policy Name <input name="policyInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.policyInput} />
                        </div> <br />
                        
                        <div className="provider-address">
                            <p>Address < br /><input name="addressInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.addressInput} /></p>
                        </div><br />
                        <div className="hospital">
                            <p>Effective Date < br /><input name="effectiveInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.effectiveInput} /></p>
                            <p>End Date < br /><input name="endInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.endInput} /></p>
                        </div><br />
                        <div>
                            <button className="add-insuranceinfo" onClick={() =>this.onSubmit() }>Add Insurance Information</button>
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

            </div>
        )
    }
}

export default InsuranceInfo;