import React, { Component } from 'react';
import axios from 'axios';


class Households extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameInput: '',
            idInput: '',

            Household: {
                id: 0,
                house_hold_name: 'Test Name',
                owner_id: 0,
                address1: '231 B Baker St',
                city: 'London',
                address_state: 'UK',
                zipcode: 90876
            }
        }
    }

    componentDidMount(){
        //axios.get()
    }
    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    submit() {
        axios.post('/api/house_hold', {name: this.state.nameInput, id: this.state.idInput*1}).then((response) => {
            console.log(response.data);
            this.setState({Household:response.data[0]})

        }).catch(console.log)
    }

    render() {

        let Household =  this.state.Household

        return (
            <div>
                <h1>Add Household</h1>
                <div>
                    name <input name="nameInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.nameInput} />
                    id <input name="idInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.idInput} />
                    <button onClick={() =>this.submit() }>Submit</button>
                </div>
                <div>
                    <p>id {Household.id}</p>
                    <p>house_hold_name {Household.house_hold_name}</p>
                    <p>owner_id {Household.owner_id}</p>
                    <p>address1 {Household.address1}</p>
                    <p>city {Household.city}</p>
                    <p>address_state {Household.address_state}</p>
                    <p>zipcode {Household.zipcode}</p>
                </div>
            </div>
        )
    }
}

export default Households;