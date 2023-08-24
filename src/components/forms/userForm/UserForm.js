//import the boostrap compents we will be using on this form
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UserForm({ handleChange, handleSubmit, formData, isUpdate }) {

    return (
        <div className="UserForm container">

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label><strong>First Name:</strong></Form.Label>
                    <Form.Control required minLength="2" onChange={handleChange} value={formData.firstName} type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label><strong>Last Name:</strong></Form.Label>
                    <Form.Control required minLength="2" onChange={handleChange} value={formData.lastName} type="text" placeholder="Last Name" />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label><strong>E-mail:</strong></Form.Label>
                    <Form.Control required onChange={handleChange} value={formData.email} type="email" placeholder="Email" {...(isUpdate && {disabled:true})} />
                    {isUpdate ? <Form.Text muted>E-mail is read-only and cannot be updated from here</Form.Text> : null}
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label><strong>Password</strong></Form.Label>
                    <Form.Control {...(!isUpdate && {required:true})}  onChange={handleChange} value={formData.password} type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label><strong>Confirm Password</strong></Form.Label>
                    <Form.Control name="confirmPassword" {...(!isUpdate && {required:true})} type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )

}

export default UserForm
