// UserInput.jsx

// 1. import needed functions and dependencies
import { useAppContext } from "./AppContext";
import { NavLink } from "react-router-dom";

// Styles for div, input, and button sections
const searchContainerStyle = {
	display: "flex",
	alignItems: "center",
	cursor: 'pointer'
};

const searchStyle = {
	display: 'inline-block',
	padding: '10px 15px',
	fontSize: '20px',
	border: "1px solid #fff",
	outline: "none",
};


const UserInput = () => {
	const { inputValue, setInputValue, handleButtonClick } =
		useAppContext();

	return (
		<div style={searchContainerStyle}>
			<input
				style={{ ...searchStyle, ...{ borderRadius: '7px 0 0 7px' } }}
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Search for your favorite TV show"
			/>
			<button
				style={{ ...searchStyle, ...{ borderRadius: '0 7px 7px 0' } }}
				onClick={handleButtonClick}>
				<NavLink to="searchResults" style={{ color: 'white' }}>Search</NavLink>
			</button>
		</div>
	);
};

export default UserInput;
