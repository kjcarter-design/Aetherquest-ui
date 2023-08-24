import React, { Component } from "react";
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";
import { generateAuthHeader } from "../../utils/authHelper";

import Alert from 'react-bootstrap/Alert';

import Header from "../../components/header/Header";

import UserForm from "../../components/forms/userForm/UserForm";

class UpdateUser extends Component {

    state = {
        errorMessage: null,
        successMessage: null,
        formData: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    //when the component mounts (displays on screen) get the student from the API
    componentDidMount() {

        //get the student's id from the URL to make the API call
        const email = this.props.match.params.email;

        this.getUser(email)

        
    }

    getUser = (email) => {

        //get API url from the environment variables
        const apiURL = process.env.REACT_APP_API_URL

        //use fetch to make an API call and get a specific student (returns a promise)
        fetch(`${apiURL}/api/users/${email}`, {
            headers: {
                ...generateAuthHeader()
            }
        })
            //on success of the fetch request, turn the response that came back into JSON
            .then((response) => response.json())
            //on success of turnig the response into JSON (data we can work with), lets add that data to state
            .then((data) => {


                //update state with the data from the API causing the page to re-render
                this.setState({
                    formData: {...this.state.formData, ...data}
                });
            })
            //handle any errors/failures with getting data from the API
            .catch((error) => {
                console.log(error)
            });
    }

    //method that handles updating the data in state that matches the data in the form
    //runs everytime a form field changes
    handleChange = (event) => {
        //create a new object from form data in state
        let formData = { ...this.state.formData };

        //take what is changed in the form and update the mathcing key in the form data object
        formData[event.target.id] = event.target.value;

        //update formData in state with the new object
        this.setState({ formData });
    }

    //run when the form is submitted
    handleSubmit = (event) => {

        //prevent the form from refreshing the page
        event.preventDefault();

        const email = this.props.match.params.email;

        const newUserData = {...this.state.formData}

        if(!newUserData.password){
            delete newUserData.password
        }else{
            if(this.state.formData.password && this.state.formData.password !== event.target.confirmPassword.value){
                this.setState({errorMessage: "The supplied passwords must match!"})
                return;
            }
        }

        //use fetch to make a POST request with the Data from state that has been populated from
        //the data in the form
        fetch(`${process.env.REACT_APP_API_URL}/api/users/${email}`, {
            method: "PUT", //make sure whe set our method to POST when creating records
            headers: {
                'content-type': 'application/json',//make sure we set the content-type headers so the API knows it is recieveing JSON data
                ...generateAuthHeader()
            },
            body: JSON.stringify(newUserData) //send our data form state int he body of the request
        })
            .then((response) => response.json()) // on success, turn the respons into JSON so we can work with it
            .then((data) => {
                this.setState({successMessage: "Profile Updated Successfully"})
                this.getUser(email)
            })
            .catch(e => console.log(e.message)) //console.log any errors if the previous steps fail

    }

    render() {
        return (
            <div className="UpdateUser">

                <Header isAuthenticated={this.props.isAuthenticated} />

                <div className="container">
                    {this.state.errorMessage && <Alert variant="danger">{this.state.errorMessage}</Alert>}
                    {this.state.successMessage && <Alert variant="info">{this.state.successMessage}</Alert>}
                </div>

                <h3 className="text-center" >Update Your Profile</h3>
                <UserForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    formData={this.state.formData}
                    isUpdate={true}
                />

            </div>
        )
    }
}

export default mustBeAuthenticated(UpdateUser)
