class Auth {
    constructor(){
        this.isloggedin=false;
        this.doctorId=32;
        localStorage.setItem("doctorId",this.doctorId);
        localStorage.setItem("token","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAiLCJpYXQiOjE2MTQ2OTYxMTYsInJvbGUiOiJST0xFX0FETUlOIiwiZXhwIjoxNjE0NzM1MTE2fQ.SoLfY_-0573GXMGsKDjzjc9TLq04TTrV6wyF0t-pkHk");
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