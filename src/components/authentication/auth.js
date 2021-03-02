class Auth {
    constructor(){
        this.isloggedin=false;
        this.recordId=1;
        this.doctorId=2;
        localStorage.setItem("recordId",this.recordId);
        localStorage.setItem("doctorId",this.doctorId);
        localStorage.setItem("token","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjE0NjMzMTQyLCJyb2xlIjoiUk9MRV9ET0NUT1IiLCJleHAiOjE2MTQ2NzIxNDJ9.qXtsNHr1Ffms3g4atInHPaW12WxlLBkplzQ4BwjA-Yg");
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