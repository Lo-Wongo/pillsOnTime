import React, { Component } from 'react';
import './MedicationTile.css';

class MedicationTile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }
    }

    toggleExpanded() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const med = this.props.med;
        return (
            <div className="med" onClick={() => this.toggleExpanded()}>
                <h3>{ med.med_name }</h3>
                {
                    this.state.expanded
                    ?
                    <p>{ med.med_strength }</p>
                    :
                    null
                }
            </div>
        )
    }
}

export default MedicationTile;