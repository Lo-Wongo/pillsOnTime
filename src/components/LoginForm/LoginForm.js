import React, { Component } from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    render() {
        return (
            <form>
                <p>Login</p>
                
                    <div class="form-group">
                        <input type="text" class="form-control" id="emailaddressorphonenumber" placeholder="Email address or Phone number" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="password" placeholder="Password" />
                    </div>
    
                    <p>Forgot your password?</p>
                    <Link to="/patients"><button type="submit" value="submit" onClick={this.handleClick}>Login</button></Link>
            </form>

        )
    }
      
}












export default LoginForm;