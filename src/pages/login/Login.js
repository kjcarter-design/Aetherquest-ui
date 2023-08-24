import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';

import { connect } from "react-redux";
import * as authActions from "../../redux/actions/auth";
import { bindActionCreators } from "redux";

import AuthService from "../../authService";
import { Redirect, withRouter } from "react-router-dom";
import LoginForm from "../../components/forms/loginForm/LoginForm";
import Header from "../../components/header/Header";
import { useUser } from '../../contexts/UserContext'; // Import the useUser hook

function Login(props) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { setUser } = useUser(); // Use the hook

    const client = new AuthService();

    const handleChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.id]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        client.login(formData).then((response) => {
            // handle success
            localStorage.setItem('auth',
                JSON.stringify({
                    token: response.data.token,
                    email: response.data.email
                })
            );
            props.actions.login(response.data);
    
            // Fetch user details
            fetchUserDetails(response.data.token, response.data.email).then(userDetails => {
                setUser(userDetails); // Set the user data in the context
                localStorage.setItem("userData", JSON.stringify(userDetails))
                setSuccess(true);
            });
        })
        .catch((error) => {
            setErrorMessage("Invalid Username/Password Combination");
        })
    }
    
    const fetchUserDetails = async (token, userEmail) => {
        const apiURL = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiURL}/api/users/${userEmail}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setUser(data)
        return data;
    }
    

    const params = new URLSearchParams(props.location.search);
    const flashMessage = params.get('message');
    if (success) {
        const redirect = params.get('redirect');
        return <Redirect to={(redirect) ? redirect : "/protected"} />
    }
    return (
        <div className="LoginForm">
            <Header />
            <div className="container">
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {flashMessage && <Alert variant="info">{flashMessage}</Alert>}
            </div>
            <LoginForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login));