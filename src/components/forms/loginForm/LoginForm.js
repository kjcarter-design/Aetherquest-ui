import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginForm({handleChange, handleSubmit, formData}) {
    return (
            <div className="LoginForm container">

                <h3 className="text-center" >User Login</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label><strong>E-mail:</strong></Form.Label>
                        <Form.Control onChange={handleChange} value={formData.email} type="text" placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label><strong>Password</strong></Form.Label>
                        <Form.Control onChange={handleChange} value={formData.password} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
}

export default LoginForm;
