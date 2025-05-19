import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";
import { Modal } from "../components/Modal.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [contactToDelete, setContactToDelete] = useState(null);
  
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const checkAgenda = await fetch('https://playground.4geeks.com/contact/agendas/nael-dev');

        if (!checkAgenda.ok) {
          const createAgenda = await fetch('https://playground.4geeks.com/contact/agendas/nael-dev', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          });

          if (!createAgenda.ok) {
            throw new Error("No se pudo crear la agenda");
          }

          dispatch({
            type: 'add_contact',
            payload: {
              phoneBookContact: [],
            },
          });
          return;
        }

        const agendaData = await checkAgenda.json();

        dispatch({
          type: 'add_contact',
          payload: {
            phoneBookContact: agendaData.contacts || [],
          },
        });

      } catch (error) {
        console.error("Error al cargar la agenda:", error);
      }
    };

    if (store.phoneBookContact.length === 0) {
      fetchBook();
    }
     dispatch({ type: "set_contact_to_edit", payload: { contact: null } });

  }, []);

 
  const confirmDeleteContact = (id) => {
    setContactToDelete(id);

  };

 
  const handleDeleteContact = async () => {
    if (!contactToDelete) return;

    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/nael-dev/contacts/${contactToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("No se pudo eliminar el contacto");

      dispatch({
        type: "delete_contact",
        payload: { id: contactToDelete },
      });


      setContactToDelete(null);
    } catch (error) {
      console.error("Error eliminando contacto:", error.message);
    }
  };


  const handleEditContact = (contact) => {
    dispatch({
      type: "set_contact_to_edit",
      payload: { contact },
    });
    navigate("/book");
  };

  return (
    <div className="text-center mt-5">
      {store.phoneBookContact.map((item) => (
        <Card
          key={item.id}
          nameContact={item.fullName || item.name || "Sin nombre"}
          direction={item.address}
          phone={item.phone}
          mail={item.email}
          img="https://media.istockphoto.com/id/1087531642/es/vector/silueta-de-la-cara-macho-o-icono-perfil-de-avatar-de-hombre-persona-desconocida-o-an%C3%B3nimo.jpg?s=612x612&w=0&k=20&c=7XiO0WCSed5AgPUnEcoEsXUzn8ujjocQB-uaM9bECng="
          handleDelete={() => confirmDeleteContact(item.id)}
          handleEdit={() => handleEditContact(item)}
        />
      ))}

    
      <Modal

        onConfirm={handleDeleteContact}
        onClose={() => setContactToDelete(null)}
      />
    </div>
  );
};