import React, { useState,  useEffect } from "react";
import { useInput } from './inputhook';
import 'bootstrap/dist/js/bootstrap.js';
import "../Stylesheets/mystyle.css";
//import "../Stylesheets/styles.css";
import API from "../api/api";
import {CardBody,CardTitle, Card,Toast,ToastHeader, CardText, Badge} from 'reactstrap';
import {Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import api from "../api/api";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import AsyncSelect from 'react-select/async';
import auth from "../authentication/auth";
import { Alert } from "bootstrap";
import { useHistory } from "react-router";

export function TestReportForm(props) {

    const history = useHistory();
    const test={
        "testId": "",
        "testName": "",
        "testCost": "",
        "baselineValues": ""
    }

    const testReport=  {
        "test":test,
    }

    const dto={
        "recordId":auth.getRecordId(),
        "doctorId":auth.getDoctorId(),
        "testReport":testReport
    }

    const loadOptions = (input, callback) => {
        var temp=[];
        API.get(`test/${input}`)
        .then(response => {
          
          response.data.map(testObj => {
              temp.push({value:testObj.testId, label:testObj.testName, cost:testObj.testCost, basevalues:testObj.baselineValues})
          }
          )
          callback(temp);
        }) 
    }

    const handleOnSelect = (key) => {
        test.testId = key.value;
        test.testName = key.label;
        test.testCost = key.testCost;
        test.baselineValues = key.basevalues;
        testReport.test = test;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        API.post(`patientrecord/addtestreport`,dto)
        .then(response => {
            console.log(response);
            alert("Test Created Successfully");
            history.push("/doctor/patientrecord/viewtestresults/"+auth.getRecordId())
        })
    }

    return (
       <div className="row" style={{marginTop:"10%"}}>
        <div className="col col-md-2 col-sm-12 col-xs-12"></div>
        <Form className="col col-md-6 col-sm-12 col-xs-12 card" onSubmit={handleSubmit}>
            <h2>Add Test Report</h2>
            <FormGroup >
                <AsyncSelect 
                    row
                    loadOptions={loadOptions}
                    onChange={handleOnSelect}
                    placeholder={"Search Medical Test"}
                    autoFocus
                    invalid = {false}
                />
            </FormGroup>
            <FormGroup className="row form-group">
                <Button color="info" type="submit" style={{width:"100px", marginRight: "auto"}}>Add Test</Button>
            </FormGroup>
        </Form>

        {
            test.testId!="" ?
            <Toast>
                <ToastHeader>Test Id: {test.testId}</ToastHeader>
                <ToastHeader>Test Name: {test.testName}</ToastHeader>
                <ToastHeader>Test baselineValues: {test.baselineValues}</ToastHeader>
                <ToastHeader>Test Cost: {test.testCost}</ToastHeader>
            </Toast>
            :
            ""
        }
        <div className="col col-md-4 col-xs-12 col-sm-12"></div>

    </div>
    )
}

export function TestDetails() {

    return 
}
export function TestReportUpdateForm(props) {
    const { value:resultValue, bind:bindResult, reset:resetValue} = useInput(props.testReport);
    
    const [resultValid,setresultValid] = useState(false);

    const handleSubmit = () => {

    }
    return (
        <div class="container">
        <div class="row row-sm-12">
        <h2>Update TestReport</h2>
        </div>
        <div class="row">
        <Form className="col col-sm-8" onSubmit={handleSubmit}>
        <FormGroup className="row form-group">
            <Label  className="text-bold" for="treatment">Test Report Description</Label>
            <Input invalid={resultValid} type="textarea" {...bindResult}  rows={4} name="treatment" id="treatment" placeholder="Enter Description" />
        </FormGroup>
        <FormGroup className="row form-group">
            <Button color="info" type="submit">Update Test Report</Button>
        </FormGroup>
        </Form>
    </div>
    </div>
    )
}