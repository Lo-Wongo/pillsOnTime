import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
   render(){
       return (
           <footer>
               <div id="credits">
                   <div className="container text-center">
                   <div className="row">
                       
                       <div className="hireTap">
                           <li>&copy; hireTap 2018 All Rights Reserved</li>
                           <li><Link to="about">About</Link></li>
                           <li><Link to="contact us">Contact Us</Link></li>
                           <li><Link to="careers">Careers</Link></li>
                           <li><Link to="careers">Terms of Service</Link></li>


                       </div>

                       <div className="hireTap" id="social-networks">
                       <a href="#"><i className="fa fa-2x fa-facebook-square"></i></a>
                       <a href="#"><i className="fa fa-2x fa-twitter-square"></i></a>
                       <a href="#"><i className="fa fa-2x fa-instagram-square"></i></a>
                       <a href="#"><i className="fa fa-2x fa-linkedin-square"></i></a>
                       </div>
                   </div>
                   </div>
               </div>
           </footer>
       )
   }
}

export default Footer;