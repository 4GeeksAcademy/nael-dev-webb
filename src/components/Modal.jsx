
import React from "react";

export const Modal = ({  onConfirm, onClose }) => {
 

  return (



    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Desea eliminar el contacto</h1>
            <button type="button" className="btn-close"  aria-label="Close"></button>
          </div>
          <div className="modal-body">
          Esto será irreversible
          </div>
          <div className="modal-footer">
            <button
              onClick={onClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button
              onClick={onConfirm} type="button" className="btn btn-primary" data-bs-dismiss="modal">Delete Contact</button>
          </div>
        </div>
      </div>
    </div>



  );

};