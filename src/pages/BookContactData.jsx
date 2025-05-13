import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";



export const BookContactData = () => {
    const { store, dispatch } = useGlobalReducer()
    const contactToEdit = store.contactToEdit;
    console.log("probando al principio",contactToEdit)
    const [data, setData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: ''
    });


    useEffect(()=> {
        if(contactToEdit){
          console.log("el segundo", contactToEdit)
            setData({
                fullName:contactToEdit.fullName || contactToEdit.name || "",
                email: contactToEdit.email || "",
                phone: contactToEdit.phone || "",
                address: contactToEdit.address || "" 
            });
        }
    },[contactToEdit]);

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
              if (contactToEdit) {
        const id = store.contactToEdit.id;
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/nael-dev/contacts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newContact)
        });

        if (!response.ok) throw new Error("Error al actualizar el contacto");

        dispatch({
          type: "edit_contact",
          payload: {
            id: id,
            contact: { ...newContact, id }
          }
        });

        dispatch({ type: "set_contact_to_edit", payload: { contact: null } });

      } else {
        const editContact = await fetch("https://playground.4geeks.com/contact/agendas/nael-dev/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newContact)
        });

        if (!editContact.ok) throw new Error("Error al crear el contacto");

        const resulEdit = await editContact.json();

        dispatch({
          type: "add_contact",
          payload: {
            contact: {
              fullName: resulEdit.name,
              email: resulEdit.email,
              phone: resulEdit.phone,
              address: resulEdit.address,
              id:resulEdit.id
             
            }
          }
        });
      }

      setData({ fullName: "", email: "", phone: "", address: "" });
      

    } catch (error) {
      console.error("Error al guardar contacto:", error.message);
    }
  };

    return (
        <form className="row g-3 mx-2" onSubmit={submitForm}>
             <h1>{contactToEdit ? "Edit Contact" : "Add a new Contact"}</h1>
            <div className="col-md-12">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter full name"
                    onChange={handleInput}
                    value={data.fullName} 
                    required/>


            </div>

            <div className="col-md-12">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    onChange={handleInput}
                    value={data.email}
                    required />
            </div>
            <div className="col-md-12">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter phone"
                    minLength="9"
                    maxLength="9"
                    onChange={handleInput}
                    value={data.phone} 
                    required/>
            </div>
            <div className="col-md-12">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter adress"
                    onChange={handleInput}
                    value={data.address}
                    required />
            </div>


            <div className="col-md-12">
                <button type="submit" className="btn btn-primary col-md-12">
                    Save
                </button>
            </div>
            <Link to="/">
                <button type="button" className="btn btn-link">or get back to contacts</button>
            </Link>

        </form>

    )

}