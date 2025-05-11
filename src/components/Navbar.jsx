import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light ">
			<div className="container nav justify-content-end">
				<div className="ml-auto ">
					<Link to="/book">
						<button className="btn btn-primary">Add a new Contact</button>
					</Link>

				</div>
			</div>
		</nav>
	);
};