// UserInput.jsx
import React from "react";
import { useAppContext } from "./appContext";
import { NavLink } from "react-router-dom";

const UserInput = () => {
	const { inputValue, setInputValue, handleButtonClick, handleKeyPress } =
		useAppContext();

	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Search for your favorite TV show"
			/>
			<button onClick={handleButtonClick}>
				<NavLink to="searchResults">Search</NavLink>
			</button>
		</div>
	);
};

export default UserInput;
