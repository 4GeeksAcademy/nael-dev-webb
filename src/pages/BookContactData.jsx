import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const BASE_URL = "https://playground.4geeks.com/contact/agendas/nael-dev";

export const BookContactData = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const contactToEdit = store.contactToEdit;

  
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });


  useEffect(() => {
    if (contactToEdit) {
      setData({
        fullName: contactToEdit.fullName || contactToEdit.name || "",
        email: contactToEdit.email || "",
        phone: contactToEdit.phone || "",
        address: contactToEdit.address || ""
      });
    } else {
    
      setData({
        fullName: "",
        email: "",
        phone: "",
        address: ""
      });
    }
  }, [contactToEdit]);
  

  const handleInput = (evt) => {
    const { id, value } = evt.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const submitForm = async (evt) => {
    evt.preventDefault();

    const apiPayload = {
      name: data.fullName, 
      email: data.email,
      phone: data.phone,
      address: data.address,
    };

    try {
      if (contactToEdit && contactToEdit.id) {
      
        const response = await fetch(`${BASE_URL}/contacts/${contactToEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiPayload),
        });

        if (!response.ok) throw new Error("Error al actualizar el contacto");

        dispatch({
          type: "edit_contact",
          payload: {
            id: contactToEdit.id,
            contact: {
              id: contactToEdit.id,
              fullName: data.fullName,
              email: data.email,
              phone: data.phone,
              address: data.address,
            },
          },
        });

        dispatch({ type: "set_contact_to_edit", payload: { contact: null } });
      } else {
      
        const res = await fetch(`${BASE_URL}/contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiPayload),
        });

        if (!res.ok) throw new Error("Error al crear el contacto");

        const newContact = await res.json();

        dispatch({
          type: "add_contact",
          payload: {
            contact: {
              id: newContact.id,
              fullName: newContact.name, 
              email: newContact.email,
              phone: newContact.phone,
              address: newContact.address,
            },
          },
        });
      }

      
      setData({ fullName: "", email: "", phone: "", address: "" });
      navigate("/");
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
          required
        />
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
          required
        />
      </div>

      <div className="col-md-12">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          placeholder="Enter 9-digit phone"
          pattern="[0-9]{9}"
          title="Debe contener exactamente 9 números"
          onChange={handleInput}
          value={data.phone}
          required
        />
      </div>

      <div className="col-md-12">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          placeholder="Enter address"
          onChange={handleInput}
          value={data.address}
          required
        />
      </div>

      <div className="col-md-12">
        <button type="submit" className="btn btn-primary col-md-12">Save</button>
      </div>

      <div className="col-md-12 text-center">
        <Link to="/" className="btn btn-link">or get back to contacts</Link>
      </div>
    </form>
  );
};