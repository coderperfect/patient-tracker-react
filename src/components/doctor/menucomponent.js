import "bootstrap/dist/css/bootstrap.css";
import "../Stylesheets/mystyle.css";
import { MdChromeReaderMode,MdAssessment,MdFitnessCenter} from "react-icons/md";
import {IoLogOutSharp} from "react-icons/io5";
import {GrYoga} from "react-icons/gr";
export function NavbarUser() {
    return (
    <nav class="navbar navbar-expand-md navbar-bg-white" style={{backgroundColor:"#138496"}}>
        <a href="#" class="navbar-brand brand">Patient Tracker</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
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
              <li class="nav-item">
                  <a class="nav-link" href="/logout">Logout <IoLogOutSharp size="20px"/></a>
              </li>
          </ul>
        </div>
    </nav>
   
  )
}
export function MenuComponent(props) { 
    
    return <NavbarUser />;
}