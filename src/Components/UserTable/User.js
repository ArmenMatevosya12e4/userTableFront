import React from 'react';
import {Button} from "react-bootstrap";

const User = ({elem, index, setModalShow, modalShow, setSelectedEmail, setShow}) => {

    const handleOpenModal = (email) => {
        setModalShow(!modalShow);
        setSelectedEmail(email);
    }

    const handleShow = (email) => {
        setShow(true);
        setSelectedEmail(email)
    }
    return (
            <tr>
                <td> {index + 1} </td>
                <td>{elem.name}</td>
                <td>{elem.email}</td>
                <td>{elem.phone}</td>
                <td>
                    <Button className="btn btn-warning w-100" type="button" variant="primary"
                            onClick={() => handleOpenModal(elem.email)}>
                        Edit
                    </Button>
                </td>
                <td>
                    <Button className="btn btn-danger w-100" variant="primary" onClick={() => handleShow(elem.email)}>
                        Delete
                    </Button>

                </td>
            </tr>
    );
};

export default User;
