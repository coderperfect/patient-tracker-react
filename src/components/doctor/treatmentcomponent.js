import React, { useState,  useEffect } from "react";
import { useInput } from './inputhook';
import 'bootstrap/dist/js/bootstrap.js';
import "../Stylesheets/mystyle.css";
import API from "../api/api";
import {CardBody,CardTitle, Card, CardText, Badge} from 'reactstrap';
import {Button, Form, FormGroup, Label, Input, FormText, Alert  } from 'reactstrap';
import api from "../api/api";
import auth from "../authentication/auth";


export function Treatment(props) {

  const handleSubmit = (event) => {

  }

  return (
      
        <Card body style={{marginTop:"20px", display: "flex"}} className="col col-sm-12 text-left">
          <CardTitle tag="h7"><b>Treatment Id:  </b> {props.treatment.treatmentId}</CardTitle>
          <CardTitle className="text-left" tag="h7"><b>Treatment Description:  </b> {props.treatment.treatmentDescription}</CardTitle>
          <CardTitle tag="h7"><b>Diet Description:  </b> {props.treatment.dietExcerciseDescription}</CardTitle>
          <CardTitle  tag="h7"><b>Treatment Cost:  </b>{props.treatment.treatmentCost}</CardTitle>
          <Button color="info" id={props.treatment.treatmentId} style={{width:"200px", marginLeft: "auto"}} onClick={props.handleUpdate} >Update</Button>
        </Card>
      
  )
}

export function TreatmentList(props) {

  const [treatments,setTreatments]=useState([]);
  const [loading, setLoading]=useState(true);
  const [update,setUpdate] = useState(undefined);
  const treatmentObj={};
  

  useEffect(() => {
    API.get(`patientrecord/treatments/${auth.getRecordId()}/${auth.getDoctorId()}`)
    .then(response => {
      setTreatments(response.data);
      setLoading(false);
    })
  }, []);

  const handleUpdate = (event) => {
        setUpdate(treatmentObj[event.target.id]);
        console.log(treatmentObj[event.target.id])
  }

  return loading ?
  (
    <div>
    <div class="row spinner-grow" role="status" style={{marginTop:"20%"}}></div>
    <div class="row spinner-grow" role="status" style={{marginTop:"20%"}}></div>
    <div class="row spinner-grow" role="status" style={{marginTop:"20%"}}></div>
    </div>
  )
  :
  [
    !update ?
    [
      treatments.length > 0 ?
    (
    <div className="container row " style={{width:"100%"}}>
       <div className="col col-md-2 col-sm-0"></div>
          <div className="col col-md-8 col-sm-12">
          <Alert color="info"><b>Patient Treatment History</b></Alert>
            {
              (
              treatments.map(treatment => {
                treatmentObj[treatment.treatmentId]=treatment;
                return <Treatment handleUpdate={handleUpdate} treatment={treatment} />
              })
              )
              
            }
          </div>
      <div className="col col-md-2 col-sm-0"></div>
    </div>
     )
    :
              <Alert color="danger">Patient has no Treatment History</Alert>
    ]
   
    :
    (
    <div>
      <TreatmentForm treatment={update} recordId={auth.getRecordId()} doctorId={auth.getDoctorId()} method={"Update"}/>
    </div>
    )
    ]

}

export default function TreatmentForm(props) {
    const { value:treatmentValue, bind:bindTreatment, reset:resetTreatment} = useInput(props.treatment.treatmentDescription);
    const { value:dietValue, bind:bindDiet, reset:resetDiet} = useInput(props.treatment.dietExcerciseDescription);
    const { value:costValue, bind:bindCost, reset:resetCost} = useInput(props.treatment.treatmentCost);
    const [treatmentInValid,setTreatmentInValid] = useState(false);
    const [costInValid, setCostInvalid] = useState(false);
    const [updated,setUpdated] = useState(false);
    const dto={
      "recordId":auth.getRecordId(),
      "doctorId":auth.getDoctorId(),
      "treatment":{
        "treatmentId":props.treatment.treatmentId,
        "dietExcerciseDescription":dietValue,
        "treatmentCost":costValue,
        "treatmentDescription":treatmentValue
    }
    }

    const validate = () => {
      if(dto.treatment.treatmentDescription) {
        if(dto.treatment.treatmentDescription.trim().length === 0) {
          setTreatmentInValid(true);
          return false;
        }
        else {
          if(costValue>=0) {
            setTreatmentInValid(false);
            
            return true;
          }
          else {
            setCostInvalid(true);
            return false;
          }
          
        }
      }
      else {
        console.log("Im hete",dto)
        setTreatmentInValid(true);
        return false;
      }
      
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(props.method === "Add"){
          if(validate()){
            API.post("patientrecord/addtreatment",dto)
            .then(response => {
              console.log(response)
              setUpdated(true);
            })
            .catch(error =>{
              console.log(error)
            })
          }
        }
        else {
          if(validate()){
            
            API.post("patientrecord/updatetreatment",dto)
            .then(response => {
              console.log(response)
              setUpdated(true);
            })
            .catch(error =>{
              console.log(error)
            })
          }
        }
    }

    return !updated ?
    (
      <div class="container">
        <div class="row row-sm-12">
          <h2>{props.method} Treatment</h2>
        </div>
        <div class="row">
        <Form className="col col-sm-8" onSubmit={handleSubmit}>
          <FormGroup className="row form-group">
            <Label  className="text-bold" for="treatment">Treatment Description</Label>
            <Input invalid={treatmentInValid} type="textarea" {...bindTreatment}  rows={4} name="treatment" id="treatment" placeholder="Enter Description" />
          </FormGroup>
          <FormGroup className="row form-group">
            <Label  className="text-bold" for="diet">Diet / Excercise Description</Label>
            <Input type="textarea" {...bindDiet}  rows={4} name="diet" id="diet" placeholder="Enter Description" />
          </FormGroup>
          <FormGroup className="row form-group">
            <Label  className="text-bold" for="cost">Treatment Cost</Label>
            <Input  invalid={costInValid} type="number" min={0} step="0.01" {...bindCost}  rows={4} name="cost" id="cost" placeholder="Enter Cost" />
          </FormGroup>
          <FormGroup className="row form-group">
            <Button type="submit">{props.method} Treatment</Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  )
  :
  (
    <TreatmentList recordId={auth.getRecordId()} doctorId={auth.getDoctorId()} />
  )
}

