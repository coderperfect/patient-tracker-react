import React, { useState } from "react"
import { Alert } from "reactstrap";

export default function TokenTimer() {

    const [ttl,setTtl] = useState(179);
    React.useEffect(() => { 
        if(ttl===0) {
            window.location = "/login";
            localStorage.removeItem("guest");
            localStorage.removeItem("token");
        }
        setTimeout(() => setTtl(ttl-1) , 1000);
    });

    return (
        <Alert color="danger"> {Math.floor(ttl/60)}:{ttl%60}</Alert>
    )
}