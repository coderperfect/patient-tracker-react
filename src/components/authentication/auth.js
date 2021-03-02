class Auth {
    constructor(){
        this.isloggedin=false;
        this.doctorId=32;
        localStorage.setItem("doctorId",this.doctorId);
        localStorage.setItem("token","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAiLCJpYXQiOjE2MTQ2ODMzMjIsInJvbGUiOiJST0xFX0FETUlOIiwiZXhwIjoxNjE0NzIyMzIyfQ.ObTHYRCvZpSJUFuk_X3fCtrB3WpqlHZ7xpp4BBcIm6k");
        //localStorage.setItem("token","");
    }

    getRecordId() {
        return localStorage.getItem("recordId");
    }

    getDoctorId() {
        return localStorage.getItem("doctorId");
    }

    getAuthToken() {
        return localStorage.getItem("token");
    }
}

export default new Auth();