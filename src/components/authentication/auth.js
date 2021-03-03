class Auth {
    constructor(){
        this.isloggedin=false;
        //localStorage.setItem("token","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAiLCJpYXQiOjE2MTQ3NDczNzgsInJvbGUiOiJST0xFX0FETUlOIiwiZXhwIjoxNjE0Nzg2Mzc4fQ.W2kwa90Gf-CbDvgQvDeyC838BgxTsnZk7DAk8r2hbUs");
        //localStorage.setItem("token","");
    }

    getRecordId() {
        return localStorage.getItem("recordId");
    }

    getDoctorId() {
        return localStorage.getItem("userId");
    }

    getUserId() {
        return localStorage.getItem("userId");
    }

    getAuthToken() {
        return localStorage.getItem("token");
    }
}

export default new Auth();