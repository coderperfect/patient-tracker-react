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
                  <a class="nav-link" href="/treatments">Treatments</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/prescriptions">Prescriptions</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/viewprescriptions">View Prescription</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/testreports">Test Reports</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/updatetestreports">Add Test Reports</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/logout">Logout</a>
              </li>
          </ul>
        </div>
    </nav>
   
  )
}
export function MenuComponent(props) { 
    
    return <NavbarUser />;
}