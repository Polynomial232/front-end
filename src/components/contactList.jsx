import React, { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import axios from "axios"
import { PiTrashFill, PiPencil } from "react-icons/pi"
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./contactList.css"

function ContactList({ childFunc }) {
    const cookies = new Cookies()
    const authorization = cookies.get("Authorization")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [contactId, setContactId] = useState('')
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        childFunc.searchUpdate = searchUpdate
        getData()
    }, [])

    function getData() {
        axios
            .get("http://127.0.0.1/laravel-api/public/api/contacts", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authorization}`,
                },
            })
            .then((res) => setContacts(res.data.data))
            .catch((err) => console.log(err))
    }

    function getDataById(id) {
        axios
            .get("http://127.0.0.1/laravel-api/public/api/contacts", {
                params: {
                    id: id
                },
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authorization}`,
                },
            })
            .then((res) => setContacts(res.data.data))
            .catch((err) => console.log(err))
    }


    function searchUpdate(params) {
        axios
            .get("http://127.0.0.1/laravel-api/public/api/contacts", {
                params: params,
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authorization}`,
                },
            })
            .then((res) => setContacts(res.data.data))
            .catch((err) => console.log(err))
    }

    function deleteData(id) {
        axios
            .delete(`http://127.0.0.1/laravel-api/public/api/contacts/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authorization}`,
                },
            })
            .then((res) => getData())
            .catch((err) => console.log(err))
    }

    function modalShow(id){
        setContactId(id)
        handleShow()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{contactId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            <Container fluid>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Nomor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.nama}</td>
                                <td>{contact.email}</td>
                                <td>{contact.nomor}</td>
                                <td>
                                    <div
                                        className="d-flex gap-2 fs-5"
                                    >
                                        <PiPencil 
                                            className="pointer"
                                            onClick={() => modalShow(contact.id)}
                                        />
                                        <PiTrashFill
                                            className="text-danger pointer"
                                            onClick={() => deleteData(contact.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default ContactList
