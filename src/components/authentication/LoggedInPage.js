import React, { Component } from 'react';
import  '../StyleSheet.css'
export default class LoggedInComponent extends Component{
    render() {
        return (
            <div className="d-flex justify-content-center">
                <h1> You have Logged In Successfully</h1>
            </div>
        );
    }
}