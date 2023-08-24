import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert';

import Header from "../../components/header/Header";

import UserForm from "../../components/forms/userForm/UserForm";

class Register extends Component {

    state = {
        errorMessage: null,
        formData: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    //method that handles updating the data in state that matches the data in the form
    //runs everytime a form field changes
    handleChange = (event) => {
        //create a new object from form data in state
        let formData = {...this.state.formData};

        //take what is changed in the form and update the mathcing key in the form data object
        formData[event.target.id] = event.target.value;

        //update formData in state with the new object
        this.setState({formData});
    }

    //run when the form is submitted
    handleSubmit = (event) => {

        //prevent the form from refreshing the page
        event.preventDefault();

        if(this.state.formData.password && this.state.formData.password !== event.target.confirmPassword.value){
            this.setState({errorMessage: "The supplied passwords must match!"})
            return;
        }

        //get API url from the environment variables
        const apiURL = process.env.REACT_APP_API_URL
        
        //use fetch to make a POST request with the Data from state that has been populated from
        //the data in the form
        fetch(`${apiURL}/api/users`, {
            method: "POST", //make sure whe set our method to POST when creating records
            headers: {
                'content-type': 'application/json' //make sure we set the content-type headers so the API knows it is recieveing JSON data
            },
            body: JSON.stringify(this.state.formData) //send our data form state int he body of the request
        })
        .then((response) => response.json()) // on success, turn the respons into JSON so we can work with it
        .then((data) => {
            const message = "Registration successful! Please sign-in"
            //programatically redirect to another route on success
            this.props.history.push(`/login?message=${message}`)
        })
        .catch(e => console.log(e.message)) //console.log any errors if the previous steps fail

    }

    render() {
        return (
            <div className="Register">

                <Header/>

                <div className="container">
                    {this.state.errorMessage && <Alert variant="danger">{this.state.errorMessage}</Alert>}
                </div>
                
                <h3 className="text-center" >Create an Account</h3>
                <UserForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    formData={this.state.formData}
                />

            </div>
        )
    }
}

export default Register
