import React, { Component } from 'react';
import './RegisterAccount.css';

class RegisterAccount extends Component {
    render() {
        return (
            <form>
                <p>Register Account</p>

                <div className="main-form">
                
                    <div class="form-group">
                        <input type="text" class="form-control" id="emailaddressorphonenumber" placeholder="Email address or Phone number" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="password" placeholder="Password" />
                    </div>
                    <div class="form-group">
                        <input type="phonenumber" class="form-control" id="phonenumber" placeholder="Enter your phone number for pills reminders" />
                    </div>
                    <div>
                        <button type="submit" value="submit" onClick={this.handleClick}>Register</button>
                    </div>
                </div>
            </form>

        )
    }
      
}

export default RegisterAccount;
