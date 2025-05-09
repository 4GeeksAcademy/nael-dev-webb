import React from "react";
import { Link } from "react-router-dom";



 export const BookContactData = ()=>{
    return(
        <form className="row g-3 mx-2">
            <h1>Add a new Contact</h1>
            <div className="col-md-12">
                <label htmlFor="inputName" className="form-label">Full Name</label>
                <input type="fullname" className="form-control" id="inputName" placeholder="Enter full name"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="inputEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Enter email"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="inputPhone" className="form-label">Phone</label>
                <input type="text" className="form-control" id="inputAddress" placeholder="Enter phone"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="inputAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="inputAddress" placeholder="Enter adress"/>
            </div>
           
           
            <div className="col-md-12">
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>

    )
}