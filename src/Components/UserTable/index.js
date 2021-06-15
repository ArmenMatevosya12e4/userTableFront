import React, {useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import AddUser from './AddUser';
import Users from './Users';
import SnackBar from "@material-ui/core/Snackbar";

const UserTable = () => {

    const [usersDataTable, setUsersDataTable] = useState([]);
    const [userCreateData, setUserCreateData] = useState({});
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [snackbar, setSnackbar] = useState({
        snackBarOpen: false,
        snackbarMsg: ''
    })
    useEffect(() => {
        const currentUserData = JSON.parse(localStorage.getItem('usersDataTable')) || null
        currentUserData &&
        setUsersDataTable(currentUserData)
    }, []);

    useEffect(() => {
        localStorage.setItem('usersDataTable', JSON.stringify(usersDataTable))
        if (!usersDataTable.length) {
            localStorage.removeItem('usersDataTable')
        }

    }, [usersDataTable]);

    const handleClose = () => {
        setSnackbar({
            snackBarOpen: false,
            snackbarMsg: ''
        })
    }

    return (
        <Container>
            <SnackBar
                variant="contained"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                open={snackbar.snackBarOpen}
                message={snackbar.snackbarMsg}
                autoHideDuration={3000}
                onClose={handleClose}
            />
            <Row className="g-2">
                <AddUser
                    handleClose={handleClose}
                    setSnackbar={setSnackbar}
                    selectedEmail={selectedEmail}
                    modalShow={modalShow}
                    setModalShow={setModalShow}
                    user={usersDataTable?.find(item => item.email === selectedEmail)}
                    userCreateData={userCreateData}
                    setUserCreateData={setUserCreateData}
                    usersDataTable={usersDataTable}
                    setUsersDataTable={setUsersDataTable}
                    setSelectedEmail={setSelectedEmail}
                />
                <Users
                    setSnackbar={setSnackbar}
                    setModalShow={setModalShow}
                    setUserCreateData={setUserCreateData}
                    setSelectedEmail={setSelectedEmail}
                    setUsersDataTable={setUsersDataTable}
                    usersDataTable={usersDataTable}
                    user={usersDataTable?.find(item => item.email === selectedEmail)}
                />
            </Row>
        </Container>
    );
}

export default UserTable;
