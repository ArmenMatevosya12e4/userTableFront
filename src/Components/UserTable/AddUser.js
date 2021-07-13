import React from 'react';
import {Row, Button, Col} from 'react-bootstrap';
import CreateEditModal from './CreateEditModal';

const AddUser = (props) => {

    const {
        selectedEmail,
        setSelectedEmail,
        setUsersDataTable,
        usersDataTable,
        userCreateData,
        setUserCreateData,
        setModalShow,
        modalShow,
        setSnackbar,
        user,
    } = props;

    const openAddModal = () => {
        setModalShow(!modalShow)
    }

    return (
        <div className="border p-4 mt-5">
            <Row className="g-2">
                <Col lg={12}>
                    <Button variant="primary" onClick={openAddModal}>
                        Add User
                    </Button>
                    {modalShow && <CreateEditModal
                        setSelectedEmail={setSelectedEmail}
                        selectedEmail={selectedEmail}
                        setSnackbar={setSnackbar}
                        userCreateData={userCreateData}
                        usersDataTable={usersDataTable}
                        setUserCreateData={setUserCreateData}
                        setModalShow={setModalShow}
                        setUsersDataTable={setUsersDataTable}
                        user={user}
                        modalShow={modalShow}
                        onHide={() => setModalShow(false)}
                    />}
                </Col>
            </Row>
        </div>
    );
};

export default AddUser;
