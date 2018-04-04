import React from 'react';
// import logo from '../user.jpg';
import { Link } from 'react-router-dom';
import './SneakPeak.css';


function SneakPeak() {

    return (
        <div className="box">
            
        <br />
        <Link to="patients"><button className='btn'>Patients</button></Link>
        < br />
        <Link to="doctor"><button className='btn'>My Doctor's Info</button></Link>
        <br />
        <Link to="patients"><button className='btn'>My Medications</button></Link>
        <br />
        <Link to="insuranceinfo"><button className='btn'>Insurance Info</button></Link>
        <br />
        <Link to="emergencycontacts"><button className='btn'>In Case of Emergency</button></Link>
        <br />
        <Link to="mymedicalrecords"><button className='btn'>My Medical Records</button></Link>
        
    </div>
    )
}

export default SneakPeak;