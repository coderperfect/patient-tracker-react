import "bootstrap/dist/css/bootstrap.css";
import "../Stylesheets/mystyle.css";
export function NavbarUser() {
    return (
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a href="#" class="navbar-brand brand">Patient Tracker</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
       </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
              <li class="nav-item">
                  <a class="nav-link" href="/doctor/patientrecord/patientrecords">Patient Records</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/doctor/patientrecord/viewtestresults">View Test Reports</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/doctor/patientrecord/dietexercise">Diet/Exercises</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/doctor/patientrecord/logout">Logout</a>
              </li>
          </ul>
        </div>
    </nav>
   
  )
}
export function MenuComponent(props) { 
    
    return <NavbarUser />;
}