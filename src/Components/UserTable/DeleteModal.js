import React from 'react';
import {Button, Modal} from 'react-bootstrap';

const DeleteModal = (props) => {
    const {
        index,
        setShow,
        show,
        userDataDelete
    } = props;
    const handleClose = () => setShow(false);

    return (
            <Modal show={show}>
                <Modal.Body className="fz-5"><h1>Are You Sure ? Delete User?</h1></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" id={index} onClick={userDataDelete}>
                        Yes
                    </Button>
                    <Button variant="outline-dark" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}

export default DeleteModal;