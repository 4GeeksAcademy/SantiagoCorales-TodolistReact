import React from "react";
import Api  from "./Api.jsx";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<Api/>
		</div>
	);
};

export default Home;