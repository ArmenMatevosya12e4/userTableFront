import React, {useEffect, useState} from 'react';
import {Modal, Container, Button, Form} from 'react-bootstrap';

const CreateEditModal = (props) => {

    const {
        setSnackbar,
        user,
        setModalShow,
        selectedEmail,
        setSelectedEmail,
        userCreateData,
        usersDataTable,
        modalShow,
        setUserCreateData,
        setUsersDataTable,
    } = props;

    let concatObject = {};
    const [usersTableDataErrors, setUsersTableDataErrors] = useState({
        name: {error: false, valid: false, message: (field) => ''},
        email: {error: false, valid: false, message: (field) => ''},
        phone: {error: false, valid: false, message: (field) => ''}
    });
    const [usersErrorArray, setUsersErrorArray] = useState([]);
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const regName = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,2}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,2})?)/;
    const phonePattern = /([+374]{4}|[0]{1})?([1-9]{2})(\d{6})/;

    useEffect(() => {
        return () => {
            setSelectedEmail(null)
        }
    }, []);

    const handleCreateData = (field, value) => {
        userCreateData[field] = value;
        validate(field, value);
    };

    const validate = (field, value)=>{
        const copyUsersDataTableErrors = {...usersTableDataErrors};
        const fieldError = copyUsersDataTableErrors[field]
        const index = usersDataTable.findIndex(item => item.email === userCreateData.email);
        const indexPhone = usersDataTable.findIndex(item => item.phone === userCreateData.phone);
        if (usersTableDataErrors.name.error && usersTableDataErrors.email.error && usersTableDataErrors.phone.error) {
            usersTableDataErrors.name.error = false;
            usersTableDataErrors.email.error = false;
            usersTableDataErrors.phone.error  = false;
        }
        switch (field) {
            case 'name':
                if (!regName.test(value)) {
                    fieldError.error = true;
                    fieldError.valid = false;
                    fieldError.message = (field) => `${field} Name Should Be Incorrect, Set Full Name`;
                } else {
                    fieldError.error = false;
                    fieldError.valid = true;
                    fieldError.message = (field) => ``;
                }
            break;
            case 'email': 
                if (!pattern.test(value)) {
                        fieldError.error = true;
                        fieldError.valid = false;
                        fieldError.message = (field) => `${field} Email Should Be Unique and Require!`;
                } else if (index !== -1) {
                    usersTableDataErrors.email.error = true;
                    usersTableDataErrors.email.valid = false
                    usersTableDataErrors.email.message = () => 'Email Should ben Unique Set Other Email!'
                } else {
                    fieldError.error = false;
                    fieldError.valid = true;
                    fieldError.message = (field) => ``;
                }
            break;
            case 'phone': 
                if(!phonePattern.test(value)) {
                    fieldError.error = true;
                    fieldError.valid = false;
                    fieldError.message = (field) => `${field} Phone Should Be Incorrect, For Example +374 96 66 66 66`;
                } else if(indexPhone !== -1) {
                    usersTableDataErrors.phone.error = true;
                    usersTableDataErrors.phone.valid = false
                    usersTableDataErrors.phone.message = () => 'Phone Should ben Unique Set Other Phone!'
                } else {
                    fieldError.error = false;
                    fieldError.valid = true;
                    fieldError.message = (field) => ``;
                }
            break;
        }
        setUsersTableDataErrors({
            ...usersTableDataErrors,
            fieldError
        })
    };

    const handleAddUser = () => {
        debugger
        setUsersErrorArray(user => [...user, usersTableDataErrors])
        const index = usersDataTable.findIndex(item => item.email === userCreateData.email);
        if (!usersTableDataErrors.name.valid && !usersTableDataErrors.email.valid && !usersTableDataErrors.phone.valid) {
            setModalShow(true);
            usersTableDataErrors.name.error = true;
            usersTableDataErrors.email.error = true;
            usersTableDataErrors.phone.error  = true;
            usersTableDataErrors.name.message = ()=> 'Full Name Required!'
            usersTableDataErrors.email.message = ()=> 'Email Name Required!'
            usersTableDataErrors.phone.message = ()=> 'Phone Name Required!'
        } else if (index !== -1) {
            usersTableDataErrors.email.error = true;
            usersTableDataErrors.email.valid = false
            usersTableDataErrors.email.message = ()=> 'Email Should ben Unique Set Other Email!'
        } else if (usersTableDataErrors.name.valid && usersTableDataErrors.email.valid && usersTableDataErrors.phone.valid) {
            setUsersDataTable(user => [...user, userCreateData]);
            setSnackbar({
                snackBarOpen: true,
                snackbarMsg: 'User Created!'
            })
            setUserCreateData({});
            setModalShow(false);
        }
    }

    const handleEditData = () => {
        const index = usersDataTable.findIndex(item => item.email === userCreateData.email);
         if (index !== -1) {
            usersTableDataErrors.email.error = true;
            usersTableDataErrors.email.valid = false
            usersTableDataErrors.email.message = ()=> 'Email Should ben Unique Set Other Email!'
        } else if (usersTableDataErrors.name.valid || usersTableDataErrors.email.valid || usersTableDataErrors.phone.valid) {
            const currentUserData = [...usersDataTable];
            const index = currentUserData.findIndex(item => item.email === selectedEmail);
            concatObject = {...currentUserData[index], ...userCreateData};
            currentUserData[index] = concatObject;
            setUsersDataTable(currentUserData);
            setUserCreateData({});
            setModalShow(false);
            setSnackbar({
                snackBarOpen: true,
                snackbarMsg: "User Updated!"
            })
        }
    }
    const handleCancel =()=> {
        setModalShow(false);
        setSelectedEmail(null);
        setUsersTableDataErrors({});
    }

    return (
        <>
            <Modal show={modalShow} backdrop="static" aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body className="show-grid">
                    <Container className="p-3">
                        <Form
                              className="d-flex justify-content-center flex-column align-items-center"
                              onSubmit={(e) => e.preventDefault()}>
                            <Form.Group className="w-100" controlId="formBasicName">
                                <Form.Label className="mt-2">Full Name</Form.Label>
                                <Form.Control defaultValue={user?.name} required
                                              isInvalid={usersTableDataErrors.name.error}
                                              isValid={usersTableDataErrors.name.valid}
                                              onChange={(e) => handleCreateData('name', e.target.value)} type="text"
                                              name="name" placeholder="Enter Name"/>
                                <Form.Control.Feedback type="invalid">
                                    {usersTableDataErrors.name.message('name')}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>
                                    Name Is Correct.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="w-100" controlId="formBasicEmail">
                                <Form.Label className="mt-2">Email address</Form.Label>
                                <Form.Control defaultValue={user?.email}
                                              isInvalid={usersTableDataErrors.email.error}
                                              isValid={usersTableDataErrors.email.valid}
                                              required onChange={(e) => handleCreateData('email', e.target.value)}
                                              type="email" name="email" placeholder="Enter email"/>
                                <Form.Control.Feedback type="invalid">
                                    {usersTableDataErrors.email.message('email')}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>
                                    Email Is Correct.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="w-100" controlId="formBasicPhone">
                                <Form.Label className="mt-2">Phone</Form.Label>
                                <Form.Control defaultValue={user?.phone}
                                              isInvalid={usersTableDataErrors.phone.error}
                                              isValid={usersTableDataErrors.phone.valid}
                                              required
                                              onChange={(e) => handleCreateData('phone', e.target.value)}
                                              placeholder="Enter Phone" name="phone"/>
                                <Form.Control.Feedback type="invalid">
                                    {usersTableDataErrors.phone.message('phone')}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>
                                    Phone Is Correct.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" type="submit"
                            onClick={user ? handleEditData : handleAddUser}>Save!
                    </button>
                    <Button variant="outline-dark" onClick={handleCancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default CreateEditModal;
