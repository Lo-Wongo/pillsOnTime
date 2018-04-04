import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import RegisterAccount from './components/RegisterAccount/RegisterAccount';
import Home from './components/Home/Home';
import LoginForm from './components/LoginForm/LoginForm';
import Header from './components/Header/Header';
import Households from './components/Households/Households';
import NewPatient from './components/NewPatient/NewPatient';
import NewMedication from './components/NewMedication/NewMedication';
import Patients from './components/Patients/Patients';
import DosageLog from './components/DosageLog/DosageLog';
import PatientRecords from './components/PatientRecords/PatientRecords';
import {connect} from 'react-redux'
import {getUser} from './ducks/reducer'
import Doctor from './components/Doctor/Doctor';
import EmergencyContacts from './components/EmergencyContacts/EmergencyContacts';
import SneakPeak from './components/SneakPeak/SneakPeak';
import InsuranceInfo from './components/InsuranceInfo/InsuranceInfo';
// import Footer from './components/Footer/Footer';

class App extends Component {
  componentDidMount(){
    this.props.getUser()
  }
  render() {
    return (
      <div className="App">
      <HashRouter>
        <div className="app-comp">
      < Header />
        <Switch>
          < Route path='/header' component={ Header }/>
          < Route path='/registeraccount' component={ RegisterAccount }/>
          < Route path='/loginform' component={ LoginForm }/>
          < Route path='/households' component={ Households }/>
          < Route path='/newpatient' component={ NewPatient }/>
          < Route path='/newmedication/:id' component={ NewMedication }/>
          < Route path='/patients' component={ Patients }/>
          < Route path='/patientrecords/:id' component={ PatientRecords }/>
          < Route path='/dosagelog' component={ DosageLog }/>
          < Route path='/doctor' component={ Doctor }/>
          < Route path='/emergencycontacts' component={ EmergencyContacts }/>
          < Route path='/insuranceinfo' component={ InsuranceInfo }/>
          < Route path='/sneakpeak' component={ SneakPeak }/>
          {/* < Route path='/footer' component={ Footer }/> */}
          < Route path='/' component={ Home } />
        </Switch>
        </div>
      </HashRouter>
      </div>
    );
  }
}

export default connect(null, {getUser})(App);
