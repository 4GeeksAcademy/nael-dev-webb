import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";



export const BookContactData = () => {
    const { store, dispatch } = useGlobalReducer()
    const [data, setData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleInput = (evt) => {
        const { id, value } = evt.target;
        setData(previus => ({
            ...previus, [id]: value
        }))
    }
    const submitForm = async (evt) => {
        evt.preventDefault();
        const newContact = {
            name: data.fullName,
            email: data.email,
            phone: data.phone,
            address: data.address,

        };

        try {
            const addContact = await fetch("https://playground.4geeks.com/contact/agendas/nael-dev/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newContact)

            });

            if (!addContact.ok) throw new Error("Error al guardar el contacto");

            const addContactData = await addContact.json();
            

            dispatch({
                type: 'add_contact',
                payload: {
                    contact: {
                        fullName: addContactData.name,
                        email: addContactData.email,
                        phone: addContactData.phone,
                        address: addContactData.address,
                        id: addContactData.id
                    }
                }
            });

            setData({
                fullName: '',
                email: '',
                phone: '',
                address: ''
            });

        } catch (error) {
            console.error("Fallo al guardar contacto:", error);
        }
    };


    return (
        <form className="row g-3 mx-2" onSubmit={submitForm}>
            <h1>Add a new Contact</h1>
            <div className="col-md-12">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter full name"
                    onChange={handleInput}
                    value={data.fullName} />


            </div>

            <div className="col-md-12">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    onChange={handleInput}
                    value={data.email} />
            </div>
            <div className="col-md-12">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter phone"
                    onChange={handleInput}
                    value={data.phone} />
            </div>
            <div className="col-md-12">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter adress"
                    onChange={handleInput}
                    value={data.address} />
            </div>


            <div className="col-md-12">
                <button type="submit" className="btn btn-primary col-md-12">Save</button>
            </div>
            <Link to="/">
                <button type="button" className="btn btn-link">or get back to contacts</button>
            </Link>

        </form>

    )

}