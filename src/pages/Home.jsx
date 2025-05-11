import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";
import { useEffect } from "react";

export const Home =   () => {

  const {store, dispatch} =useGlobalReducer()

	useEffect(() => {


		const fetchBook = async () => {
			const dataBookData = await fetch('https://playground.4geeks.com/contact/agendas/nael-dev');
			const promise = await dataBookData.json();

			dispatch({
				type: 'add_contact',
				payload: {
					phoneBookContact: promise.contacts
				}
			})

		}
		if(store.phoneBookContact.length === 0){
			fetchBook();
		}


	}, []);

	const handleDeleteContact = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/nael-dev/contacts/${id}`, {
				method: "DELETE"
			});

			if (!response.ok) throw new Error("No se pudo eliminar el contacto");

			// Elimina el contacto del estado local
			dispatch({
				type: 'delete_contact',
				payload: { id }
			});

			
		} catch (error) {
			console.error("Error eliminando contacto:", error.message);
			
		}
	};

	return (
		<div className="text-center mt-5">
			
				{
					store.phoneBookContact.map(item => (
						<Card key={item.id}
							nameContact={item.name || item.fullName}
							direction= {item.address}
							phone = {item.phone}
							mail = {item.email}
							img ="https://media.istockphoto.com/id/1087531642/es/vector/silueta-de-la-cara-macho-o-icono-perfil-de-avatar-de-hombre-persona-desconocida-o-an%C3%B3nimo.jpg?s=612x612&w=0&k=20&c=7XiO0WCSed5AgPUnEcoEsXUzn8ujjocQB-uaM9bECng="
							handleDelete={()=>handleDeleteContact(item.id)}
			/>
					))
				}
			
		</div>
	);
}; 

