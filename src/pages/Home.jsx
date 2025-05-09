import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
				
			</p>

			<Card
				nameContact="Pedro"
				direction= "44445 Mariana"
				phone = "655656565"
				mail = "anadiazpa@gmail.com"
			/>
		</div>
	);
}; 