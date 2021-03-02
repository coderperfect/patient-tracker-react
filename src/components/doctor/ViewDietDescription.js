import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class ViewDietDescription extends Component {
    constructor(props){
        super(props);
        this.state = {
            disabled: true,
            treatment: props.location.aboutProps.treatment,
            description: props.location.aboutProps.treatment.dietExcerciseDescription
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(event){
        event.preventDefault();
        Axios.put(`http://localhost:8081/treatment/update`, this.state.treatment)
            .then(res => {
                alert(`Diet Description saved successfully`);
            })
            .catch(error => {
                alert(error);
            })
    }

    async handleChange(event){
        await this.setState({[event.target.name] : event.target.value});
        await this.setState(prevState => ({
            treatment: {
                ...prevState.treatment,
                dietExcerciseDescription: this.state.description
            }
        }));
    }

    render(){
        if(!this.props.location.aboutProps.fromAdd){
            return(
                <div className='container-fluid'>
                    <div className='row justify-content-center h-100'>
                        <div className='col-xs-12'>
                            <div className='my-5' style={{display: 'flex',justifyContent: 'space-between'}}>
                                <h3>Treatment ID: <span>{this.props.location.aboutProps.treatment.treatmentId}</span></h3>
                                <button className='btn btn-secondary' onClick={() => {this.setState({disabled: false})}}>Update</button>
                            </div>
                            <div>
                                <textarea rows='10' cols='100' name='description' value={this.state.description} disabled={this.state.disabled} onChange={this.handleChange}>
                                    {this.props.location.aboutProps.treatment.dietExcerciseDescription}
                                </textarea>
                            </div>
                            {this.state.disabled ? '' : (
                                <button className='btn btn-primary' onClick={this.handleClick}>Save</button>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className='container-fluid'>
                    <div className='row justify-content-center h-100'>
                        <div className='col-xs-12'>
                            <div className='my-5' style={{display: 'flex',justifyContent: 'space-between'}}>
                                <h3>Treatment ID: <span>{this.props.location.aboutProps.treatment.treatmentId}</span></h3>
                            </div>
                            <div>
                                <textarea placeholder='Enter Diet Description' rows='10' cols='100' name='description' value={this.state.description} onChange={this.handleChange}/>
                            </div>
                            <button className='btn btn-primary' onClick={this.handleClick}>Save</button>
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default ViewDietDescription;