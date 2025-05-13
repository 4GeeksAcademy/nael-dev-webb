import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";



export const Card = (
    {nameContact, 
        direction, 
        phone, 
        mail,
        img,
        handleEdit,
        handleDelete
    }) => {
    return (
        <div className="container-fluid justify-content-center border border-black border-end-0 border-start-0  pb-5">
            <div className="row justify-content-center">

                <div className="col-8 col-lg-4  d-flex justify-content-center ">
                    <img
                        src={img}
                        className="rounded-circle p-3"
                        style={{ width: "250px", height: "250px", objectFit: "cover" }}
                        alt="contact photo"
                    />
                </div>
                <div className=" col-8 col-lg-4 my-1">
                    <h1 className="text-start">{nameContact}</h1>
                    <div className=" text-start">
                        <h4><CiLocationOn /> {direction} </h4>
                        <h4><FaPhoneFlip /> {phone} </h4>
                        <h4><MdEmail />{mail} </h4>
                    </div>


                </div>
                <div className="col-8 col-lg-4 ">
                
                        <button 
                            className="btn boton p-1 mx-1 font-si fa-lg" 
                            type="button"  
                            onClick={handleEdit}
                            >
                            <MdOutlineModeEdit/>
                        </button>
                    
                    
                    <button
                        className="btn boton p-1 mx-1 "
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={handleDelete}>
                        <RiDeleteBinFill />
                    </button>
                   
                </div>

            </div>
        </div>
    )
}