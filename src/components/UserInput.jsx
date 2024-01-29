// UserInput.jsx

// 1. import needed functions and dependencies
import { useAppContext } from "./AppContext";
import { NavLink } from "react-router-dom";

// Styles for div, input, and button sections
const searchContainerStyle = {
	display: "flex",
	alignItems: "center",
	cursor: "pointer",
};

const searchStyle = {
	display: "inline-block",
	padding: "10px 15px",
	fontSize: "20px",
	border: "1px solid #fff",
	outline: "none",
};

const UserInput = () => {
	// Access global state and functions from the context
	const { inputValue, setInputValue, handleButtonClick } = useAppContext();

	// JSX content for the UserInput component
	return (
		<div style={searchContainerStyle}>
			<input
				style={{ ...searchStyle, ...{ borderRadius: "7px 0 0 7px" } }}
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Look up your favorite Show"
			/>
			<button
				style={{ ...searchStyle, ...{ borderRadius: "0 7px 7px 0" } }}
				onClick={handleButtonClick}
			>
				<NavLink to="searchResults" style={{ color: "white" }}>
					Search
				</NavLink>
			</button>
		</div>
	);
};

export default UserInput;

/*
1. **`import React from "react";`:**
   - Imports the `React` library, which is required for creating React components.

2. **`import { useAppContext } from "./appContext";`:**
   - Imports the `useAppContext` hook from the "./appContext" file, allowing the component to access global state and functions.

3. **`import { NavLink } from "react-router-dom";`:**
   - Imports the `NavLink` component from the "react-router-dom" library, which is used for navigation within the React application.

4. **`const UserInput = () => {...}`:**
   - Defines the `UserInput` functional component, representing the user input section with a search input field and a search button.

5. **`const { inputValue, setInputValue, handleButtonClick, handleKeyPress } = useAppContext();`:**
   - Destruct*/
