import React, {useState} from 'react';
import {Col, Table} from 'react-bootstrap';
import DeleteModal from "./DeleteModal";
import User from './User';

const Users = (props) => {

    const [show, setShow] = useState(false);
    const {
        user,
        usersDataTable,
        setUsersDataTable,
        setSelectedEmail,
        setModalShow,
        modalShow,
        setSnackbar
    } = props;

    const userDataDelete = () => {
        const copyUserData = [...usersDataTable];
        const index = copyUserData.findIndex(item => item.email === user.email);
        copyUserData.splice(index, 1);
        setUsersDataTable(copyUserData);
        setShow(false)
        setSnackbar({
            snackBarOpen: true,
            snackbarMsg: 'User Deleted!'
        })
    }

    return (
        <Col lg={12} className="p-0">
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    usersDataTable.map((elem, index) =>
                        (
                            <User key={elem.email} modalShow={modalShow} elem={elem} setShow={setShow} index={index} setSelectedEmail={setSelectedEmail} setModalShow={setModalShow}/>
                        )
                    )

                }
                <DeleteModal userDataDelete={userDataDelete} show={show} setShow={setShow}/>
                </tbody>
            </Table>
        </Col>
    );
};

export default Users;
