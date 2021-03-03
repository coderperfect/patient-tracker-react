class Auth {
    constructor(){
        this.isloggedin=false;
        this.doctorId=32;
        localStorage.setItem("doctorId",this.doctorId);
        localStorage.setItem("token","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAiLCJpYXQiOjE2MTQ3NTA5NTUsInJvbGUiOiJST0xFX0FETUlOIiwiZXhwIjoxNjE0Nzg5OTU1fQ.wQpYL2sDLoLFGZqq5EhC6qaW6ef8bTTQ0Oo9iMW0-CE");
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