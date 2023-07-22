import React, { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import axios from "axios"
import { PiTrashFill } from "react-icons/pi"

function ContactList({ childFunc }) {
    const cookies = new Cookies()
    const authorization = cookies.get("Authorization")
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

    return (
        <>
            <table className="table text-start">
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
                                <PiTrashFill
                                    onClick={() => deleteData(contact.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ContactList
