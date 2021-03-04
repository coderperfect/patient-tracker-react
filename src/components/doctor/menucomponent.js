import "bootstrap/dist/css/bootstrap.css";
import "../Stylesheets/mystyle.css";
import { MdChromeReaderMode,MdAssessment,MdFitnessCenter} from "react-icons/md";
import {IoLogOutSharp,IoHelpCircle} from "react-icons/io5";
import {GrYoga} from "react-icons/gr";
import {GiHamburgerMenu} from "react-icons/gi";
import { Link } from "react-router-dom";
export function NavbarUser() {
    return (
    <nav class="navbar navbar-expand-lg navbar-bg-dark" style={{backgroundColor:"#138496"}}>
        <a href="#" class="navbar-brand brand">Patient Tracker</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <GiHamburgerMenu color="white" className="navbar-toggler-icon"/>
       </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
              <li class="nav-item">
                  <a class="nav-link" href="/doctor/patientrecord/patientrecords">Patient Records <MdChromeReaderMode size="20px"/></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/doctor/patientrecord/viewtestresults">View Test Reports <MdAssessment  size="20px"/></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/doctor/patientrecord/dietexercise">Diet/Exercises <MdFitnessCenter  size="20px"/></a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctor/help" >Help <IoHelpCircle size="20px"/></Link>
            </li>
              <li class="nav-item">
                  <a class="nav-link" href="/">Logout <IoLogOutSharp size="20px"/></a>
              </li>
              
          </ul>
        </div>
    </nav>
   
  )
}
export function MenuComponent(props) { 
    
    return <NavbarUser />;
}